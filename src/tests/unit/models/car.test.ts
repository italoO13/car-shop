import { expect } from "chai";
import sinon from 'sinon';
import { Model } from "mongoose";
import CarModel from "../../../models/Car";
import {carMock, carMockWithId} from '../../mocks/car'


describe('Rota de model', () => {
  const carModel = new CarModel()

  before(() => {
    sinon.stub(Model, 'create').resolves(carMockWithId)
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



})