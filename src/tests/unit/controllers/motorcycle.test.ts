import {expect} from 'chai';
import * as sinon from 'sinon';
import {NextFunction, Request, Response} from 'express';
import MotorModel from '../../../models/Motorcycle';
import MotorService from '../../../services/Motorcycle';
import MotorController from '../../../controllers/Motorcycle';
import {motorMock, motorMockWithId} from '../../mocks/motorcycle';

describe('Rotar Car controller', () => {
  const motorModel = new MotorModel();
  const motorService = new MotorService(motorModel);
  const motorController = new MotorController(motorService);
  const req = {} as Request;
  const res = {} as Response;
  const next = {} as NextFunction;

  before(() => {
    sinon.stub(motorService, 'create').resolves(motorMockWithId)
    sinon.stub(motorService, 'read').resolves([motorMockWithId, motorMockWithId])
    sinon.stub(motorService, 'readOne').resolves(motorMockWithId)
    sinon.stub(motorService, 'update').resolves(motorMockWithId)
    sinon.stub(motorService, 'delete').resolves(motorMockWithId)

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  })

  after(() => {
    sinon.restore()
  })

  describe('Rota post Motorcycles', ()=> {
    it('Criado com sucesso', async() => {
      req.body = motorMock;
      await motorController.create(req, res, next)
      expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(motorMockWithId)).to.be.true
    })

  })
  describe('Rota Get Motorcycles', () => {
    describe('Quando a rota é "/"', () => {
      it('Criado com sucesso', async() => {
        await motorController.read(req, res, next);
        expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
        expect((res.json as sinon.SinonStub).calledWith([motorMockWithId, motorMockWithId])).to.be.true
      })

    })

    describe('Quando a rota é "/id"', () => {
      it('Criado com sucesso', async() => {
        req.params = {id:'validId'};
        await motorController.readOne(req, res, next);
        expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
        expect((res.json as sinon.SinonStub).calledWith(motorMockWithId)).to.be.true
      })

    })

  })
  describe('Rota update Motorcycles', ()=> {
    it('Criado com sucesso', async() => {
      req.params = {id:'validId'}
      req.body = motorMock;
      await motorController.update(req, res, next)
      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(motorMockWithId)).to.be.true
    })


  })

  describe('Rota Delete Motorcycles', ()=> {
    it('Criado com sucesso', async() => {
      req.params = {id:'validId'}
      req.body = motorMock;
      await motorController.delete(req, res, next)
      expect((res.status as sinon.SinonStub).calledWith(204)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(motorMockWithId)).to.be.true
    })


  })


})