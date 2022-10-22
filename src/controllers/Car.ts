import { Request, Response, NextFunction } from 'express';
import { ICar } from '../interfaces/ICar';
import IService from '../interfaces/IService';
import 'express-async-errors';

class CarController {
  readonly _service: IService<ICar>;
  constructor(service:IService<ICar>) {
    this._service = service;
  }

  create = async (req:Request, res:Response<ICar>, _next:NextFunction) => {
    const response = await this._service.create(req.body);
    res.status(201).json(response);
  };

  read = async (req:Request, res:Response<ICar[]>, _next:NextFunction) => {
    const response = await this._service.read();
    res.status(200).json(response);
  };
}
export default CarController;