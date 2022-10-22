import { expect } from "chai";
import sinon from 'sinon';
import { Model } from "mongoose";
import CarModel from "../../../models/Car";
import {carMock, carMockWithId} from '../../mocks/car'


describe('Rota de model', () => {
  const carModel = new CarModel()

  before(() => {
    sinon.stub(Model, 'create').resolves(carMockWithId)
    sinon.stub(Model, 'find')
    .onFirstCall().resolves([carMockWithId, carMockWithId])
    .onSecondCall().resolves([])
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


  })



})