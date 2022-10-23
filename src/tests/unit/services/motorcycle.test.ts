import { expect } from "chai";
import sinon from 'sinon';
import MotorModel from '../../../models/Motorcycle';
import { motorMock, motorMockWithId } from "../../mocks/motorcycle";
import MotorService from "../../../services/Motorcycle";
import { ZodError } from "zod";
import { ErrorTypes } from "../../../errors/catalog";

describe('Rota Car na camada de service de motorcycles', () => {
  const motorModel = new MotorModel();
  const motorService = new MotorService(motorModel)

  before(()=> {
    sinon.stub(motorModel, 'create').resolves(motorMockWithId)
    sinon.stub(motorModel, 'read')
      .onFirstCall().resolves([motorMockWithId, motorMockWithId])
      .onSecondCall().resolves([])
    sinon.stub(motorModel, 'readOne')
      .onFirstCall().resolves(motorMockWithId)
      .onSecondCall().resolves(null)
    sinon.stub(motorModel, 'update' )
      .onFirstCall().resolves(motorMockWithId)
      .resolves(null)
  })

  after(() => {
    sinon.restore()
  })

  describe('Metodo Post',() => {
    it('Criado com sucesso', async() => {
      const createMotor = await motorService.create(motorMock)
      expect(createMotor).to.be.deep.eq(motorMockWithId)
    })
    it('Falha de tipagem ao criar novo motorcycles', async() => {
      let error:any
      try {
        await motorService.create({});
      } catch (err:any) {
        error = err
      }
      expect(error).to.be.instanceOf(ZodError)
    })

  })

  describe('Metodo Get de motorcycles', () => {
    describe('quando a rota é "/"', () => {
      it('deve retornar todos os motorcycles cadastrados em um array', async() => {
        const readMotor = await motorService.read();
        expect(readMotor).to.be.deep.eq([motorMockWithId, motorMockWithId]);
      })
      it('deve retornar um array vazio caso não seja encontrado nenhum motorcycles', async() => {
        const readMotor = await motorService.read();
        expect(readMotor).to.be.deep.eq([])
      })

    })

    describe('quando a rota é "/id"', () => {
      it('deve retornar um motorcycles caso seja encontrado', async() => {
        const readOneMotor = await motorService.readOne('validId');
        expect(readOneMotor).to.be.deep.eq(motorMockWithId);
      })
      it('deve retonar um erro do type notfound se nenhum motorcycle', async() => {
        let error:any
        try {
          await motorService.readOne('validid');
        } catch (err:any) {
          error = err
        }
        expect(error.message).to.be.eq(ErrorTypes.NotFound)
      })

    })



  })

  describe('Metodo Update',() => {
    it('Criado com sucesso', async() => {
      const update = await motorService.update('idvalid', motorMock)
      expect(update).to.be.deep.eq(motorMockWithId)
    })
    it('Falha de tipagem ao atualizar um novo motorcycles', async() => {
      let error:any
      try {
        await motorService.update('idvalid', {});
      } catch (err:any) {
        error = err
      }
      expect(error).to.be.instanceOf(ZodError)
    })
    it('Car que deveria ser atualizado não foi encontrado', async() => {
      let error:any
      try {
        await motorService.update('idvalid', motorMock);
      } catch (err:any) {
        error = err
      }
      expect(error.message).to.be.eq(ErrorTypes.NotFound)

    })

  })

  describe('Metodo Delete', () => {

    beforeEach(() => {
      sinon.restore()
    })

    describe('quando a rota é "/motorcycles/id"', () => {
      
      it('quando não for encontrar um Car deve retornar um erro Not Found', async() => {
        sinon.stub(motorModel, 'delete')
        .onFirstCall().resolves(null)

        let error:any;
        try {
          await motorService.delete('validId');
        } catch (e) {
          error = e;
        }
        expect(error.message).to.be.eq(ErrorTypes.NotFound)
      })

      it('Sucesso ao deleter um Car', async() => {
        sinon.stub(motorModel, 'delete').resolves(motorMockWithId)
        const deleteCar = await motorService.delete('validId');
        expect(deleteCar).to.be.eq(motorMockWithId)
      })

    })

  })

})