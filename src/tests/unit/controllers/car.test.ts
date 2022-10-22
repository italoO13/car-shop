import {expect} from 'chai';
import * as sinon from 'sinon';
import {NextFunction, Request, Response} from 'express';
import CarModel from '../../../models/Car';
import CarService from '../../../services/Car';
import CarController from '../../../controllers/Car';
import {carMock, carMockWithId} from '../../mocks/car';

describe('Rotar Car controller', () => {
  const carModel = new CarModel();
  const carService = new CarService(carModel);
  const carController = new CarController(carService);
  const req = {} as Request;
  const res = {} as Response;
  const next = {} as NextFunction;

  before(() => {
    sinon.stub(carService, 'create').resolves(carMockWithId)
    sinon.stub(carService, 'read').resolves([carMockWithId, carMockWithId])
    sinon.stub(carService, 'readOne').resolves(carMockWithId)

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  })

  after(() => {
    sinon.restore()
  })

  describe('Rota post Car', ()=> {
    it('Criado com sucesso', async() => {
      req.body = carMock;
      await carController.create(req, res, next)
      expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carMockWithId)).to.be.true
    })

  })
  describe('Rota Get Car', () => {
    describe('Quando a rota é "/"', () => {
      it('Criado com sucesso', async() => {
        await carController.read(req, res, next);
        expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
        expect((res.json as sinon.SinonStub).calledWith([carMockWithId, carMockWithId])).to.be.true
      })

    })

    describe('Quando a rota é "/id"', () => {
      it('Criado com sucesso', async() => {
        req.params = {id:'validId'};
        await carController.readOne(req, res, next);
        expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
        expect((res.json as sinon.SinonStub).calledWith(carMockWithId)).to.be.true
      })

    })

  })
  


})