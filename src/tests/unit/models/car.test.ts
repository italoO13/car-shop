import { expect } from "chai";
import sinon from 'sinon';
import { Model } from "mongoose";
import CarModel from "../../../models/Car";
import  Mongoose from "mongoose";
import {carMock, carMockWithId} from '../../mocks/car'
import {ErrorTypes} from '../../../errors/catalog'

describe('Rota de model', () => {
  const carModel = new CarModel()

  before(() => {
    sinon.stub(Model, 'create').resolves(carMockWithId)
    sinon.stub(Model, 'find')
      .onFirstCall().resolves([carMockWithId, carMockWithId])
      .onSecondCall().resolves([])
    sinon.stub(Model, 'findById')
      .onFirstCall().resolves(carMockWithId)
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
      const createCar = await carModel.create(carMock)
      expect(createCar).to.be.deep.eq(carMockWithId);
    })

  })

  describe('Metodo Get', () => {
    describe('quando a rota é "/"', () => {
      it('deve retornar todos os cars cadastrados em um array', async() => {
        const readCar = await carModel.read()
        expect(readCar).to.be.deep.eq([carMockWithId, carMockWithId])
      })
      it('deve retornar um array vazio caso não seja encontrado nenhum car', async() => {
        const readCar = await carModel.read()
        expect(readCar).to.be.deep.equal([])
      })

    })

    describe('quando a rota é "/cars/id"', () => {
      it('quando o id é invalido deve retornar erro do type InvalidId', async() => {
        let error:any;
        try {
          await carModel.readOne('invalidId');
        } catch (e) {
          error = e;
        }
        expect(error.message).to.be.eq(ErrorTypes.InvalidId)
      })

      it ('deve retornar um objeto de cars caso seja encontrado', async () => {
        const readone = await carModel.readOne('idValid');
        expect(readone).to.be.deep.eq(carMockWithId);
      })

      it ('Deve retornar null caso não seja encontrado nenhum objeto', async () => {
        const readone = await carModel.readOne('idValid');
        expect(readone).to.be.deep.eq(null);
      })

    })


  })



})