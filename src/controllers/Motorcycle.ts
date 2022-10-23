import { Request, Response, NextFunction } from 'express';
import { IMotorcycle } from '../interfaces/IMotorcycle';
import IService from '../interfaces/IService';
import 'express-async-errors';

class MotorController {
  readonly _service: IService<IMotorcycle>;
  constructor(service:IService<IMotorcycle>) {
    this._service = service;
  }

  delete = async (req:Request, res:Response<IMotorcycle>, _next:NextFunction) => {
    const { id } = req.params;
    const response = await this._service.delete(id);
    res.status(204).json(response);
  };

  update = async (req:Request, res:Response<IMotorcycle>, _next:NextFunction) => {
    const { id } = req.params;
    const response = await this._service.update(id, req.body);
    res.status(200).json(response);
  };

  create = async (req:Request, res:Response<IMotorcycle>, _next:NextFunction) => {
    const response = await this._service.create(req.body);
    res.status(201).json(response);
  };

  read = async (req:Request, res:Response<IMotorcycle[]>, _next:NextFunction) => {
    const response = await this._service.read();
    res.status(200).json(response);
  };

  readOne = async (req:Request, res:Response<IMotorcycle>, _next:NextFunction) => {
    const { id } = req.params;
    const response = await this._service.readOne(id);
    res.status(200).json(response);
  };
}
export default MotorController;