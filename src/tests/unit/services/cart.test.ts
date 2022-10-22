import { expect } from "chai";
import sinon from 'sinon';
import CarModel from '../../../models/Car';
import { carMock, carMockWithId } from "../../mocks/car";
import CarService from "../../../services/Car";
import { ZodError } from "zod";

describe('Rota Car na camada de service', () => {
  const carModel = new CarModel();
  const carService = new CarService(carModel)

  before(()=> {
    sinon.stub(carModel, 'create').resolves(carMockWithId)
    sinon.stub(carModel, 'read')
      .onFirstCall().resolves([carMockWithId, carMockWithId])
      .onSecondCall().resolves([])
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


  })

})