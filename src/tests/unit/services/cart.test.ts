import { expect } from "chai";
import sinon from 'sinon';
import CarModel from '../../../models/Car';
import { carMock, carMockWithId } from "../../mocks/car";
import CarService from "../../../services/Car";
import { ZodError } from "zod";
import { ErrorTypes } from "../../../errors/catalog";

describe('Rota Car na camada de service', () => {
  const carModel = new CarModel();
  const carService = new CarService(carModel)

  before(()=> {
    sinon.stub(carModel, 'create').resolves(carMockWithId)
    sinon.stub(carModel, 'read')
      .onFirstCall().resolves([carMockWithId, carMockWithId])
      .onSecondCall().resolves([])
    sinon.stub(carModel, 'readOne')
      .onFirstCall().resolves(carMockWithId)
      .onSecondCall().resolves(null)
    sinon.stub(carModel, 'update' )
      .onFirstCall().resolves(carMockWithId)
      .resolves(null)
  })

  after(() => {
    sinon.restore()
  })

  describe('Metodo Post',() => {
    it('Criado com sucesso', async() => {
      const createCar = await carService.create(carMock)
      expect(createCar).to.be.deep.eq(carMockWithId)
    })
    it('Falha de tipagem ao criar novo car', async() => {
      let error:any
      try {
        await carService.create({});
      } catch (err:any) {
        error = err
      }
      expect(error).to.be.instanceOf(ZodError)
    })

  })

  describe('Metodo Get de cars', () => {
    describe('quando a rota é "/"', () => {
      it('deve retornar todos os cars cadastrados em um array', async() => {
        const readCars = await carService.read();
        expect(readCars).to.be.deep.eq([carMockWithId, carMockWithId]);
      })
      it('deve retornar um array vazio caso não seja encontrado nenhum car', async() => {
        const readCars = await carService.read();
        expect(readCars).to.be.deep.eq([])
      })

    })

    describe('quando a rota é "/id"', () => {
      it('deve retornar um car caso seja encontrado', async() => {
        const readOneCar = await carService.readOne('validId');
        expect(readOneCar).to.be.deep.eq(carMockWithId);
      })
      it('deve retonar um erro do type notfound se nenhum car', async() => {
        let error:any
        try {
          await carService.readOne('validid');
        } catch (err:any) {
          error = err
        }
        expect(error.message).to.be.eq(ErrorTypes.NotFound)
      })

    })



  })

  describe('Metodo Update',() => {
    it('Criado com sucesso', async() => {
      const update = await carService.update('idvalid', carMock)
      expect(update).to.be.deep.eq(carMockWithId)
    })
    it('Falha de tipagem ao atualizar um novo Car', async() => {
      let error:any
      try {
        await carService.update('idvalid', {});
      } catch (err:any) {
        error = err
      }
      expect(error).to.be.instanceOf(ZodError)
    })
    it('Car que deveria ser atualizado não foi encontrado', async() => {
      let error:any
      try {
        await carService.update('idvalid', carMock);
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

    describe('quando a rota é "/cars/id"', () => {
      
      it('quando não for encontrar um Car deve retornar um erro Not Found', async() => {
        sinon.stub(carModel, 'delete')
        .onFirstCall().resolves(null)

        let error:any;
        try {
          await carService.delete('validId');
        } catch (e) {
          error = e;
        }
        expect(error.message).to.be.eq(ErrorTypes.NotFound)
      })

      it('Sucesso ao deleter um Car', async() => {
        sinon.stub(carModel, 'delete').resolves(carMockWithId)
        const deleteCar = await carService.delete('validId');
        expect(deleteCar).to.be.eq(carMockWithId)
      })

    })

  })

})