import { expect } from "chai";
import sinon from 'sinon';
import { Model } from "mongoose";
import MotorModel from '../../../models/Motorcycle'
import  Mongoose from "mongoose";
import {motorMock, motorMockWithId} from '../../mocks/motorcycle';
import {ErrorTypes} from '../../../errors/catalog'

describe('Rota de model de Motorcycle', () => {
  const motoModel = new MotorModel()

  before(() => {
    sinon.stub(Model, 'create').resolves(motorMockWithId)
    sinon.stub(Model, 'find')
      .onFirstCall().resolves([motorMockWithId, motorMockWithId])
      .onSecondCall().resolves([])
    sinon.stub(Model, 'findById')
      .onFirstCall().resolves(motorMockWithId)
      .resolves(null)
    sinon.stub(Model, 'findByIdAndUpdate')
      .onFirstCall().resolves(motorMockWithId)
      .resolves(null)
    sinon.stub(Mongoose, 'isValidObjectId')
      .onFirstCall().returns(false)
      .resolves(true)

  })

  after(() => {
    sinon.restore()
  })

  describe('Metodo Post', () => {
    it('Criado com sucesso', async() => {
      const createMotor = await motoModel.create(motorMock)
      expect(createMotor).to.be.deep.eq(motorMockWithId);
    })

  })

  describe('Metodo Get', () => {
    describe('quando a rota é "/"', () => {
      it('deve retornar todos os motorcycles cadastrados em um array', async() => {
        const readMotor = await motoModel.read()
        expect(readMotor).to.be.deep.eq([motorMockWithId, motorMockWithId])
      })
      it('deve retornar um array vazio caso não seja encontrado nenhum motorcycle', async() => {
        const readMotor = await motoModel.read()
        expect(readMotor).to.be.deep.equal([])
      })

    })

    describe('quando a rota é "/motorcycles/id"', () => {
      it('quando o id é invalido deve retornar erro do type InvalidId', async() => {
        let error:any;
        try {
          await motoModel.readOne('invalidId');
        } catch (e) {
          error = e;
        }
        expect(error.message).to.be.eq(ErrorTypes.InvalidId)
      })

      it ('deve retornar um objeto de motorcycle caso seja encontrado', async () => {
        const readone = await motoModel.readOne('idValid');
        expect(readone).to.be.deep.eq(motorMockWithId);
      })

      it ('Deve retornar null caso não seja encontrado nenhum objeto', async () => {
        const readone = await motoModel.readOne('idValid');
        expect(readone).to.be.deep.eq(null);
      })

    })


  })

  describe('Metodo Update', () => {
    describe('quando a rota é "/motorcycles/id"', () => {

      it ('deve retornar um objeto de motorcycles caso seja encontrado', async () => {
        const update = await motoModel.update('idValid', motorMock);
        expect(update).to.be.deep.eq(motorMockWithId);
      })

      it ('Deve retornar null caso não seja encontrado nenhum objeto', async () => {
        const update = await motoModel.update('idValid', motorMock);
        expect(update).to.be.deep.eq(null);
      })

    })
  })

  describe('Metodo Delete', () => {

    beforeEach(() => {
      sinon.restore()
      sinon.stub(Model, 'findByIdAndDelete')
        .onFirstCall().resolves(motorMockWithId)
        .onSecondCall().resolves(motorMockWithId)
        .resolves(null)
    })

    afterEach(() => {
      sinon.restore()
    })


    describe('quando a rota é "/motorcycles/id"', () => {
      
      it('quando o id é invalido deve retornar erro do type InvalidId', async() => {
        sinon.stub(Mongoose, 'isValidObjectId').returns(false)
        let error:any;
        try {
          await motoModel.delete('invalidId');
        } catch (e) {
          error = e;
        }
        expect(error.message).to.be.eq(ErrorTypes.InvalidId)
      })

      it('Sucesso ao deleter um Motorcycles', async() => {
        sinon.stub(Mongoose, 'isValidObjectId').returns(true)
        const deleteMotor = await motoModel.delete('validId');
        expect(deleteMotor).to.be.eq(motorMockWithId)
      })

    })

  })


})