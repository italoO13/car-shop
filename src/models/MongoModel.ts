import { Model, isValidObjectId } from 'mongoose';
import { IModel } from '../interfaces/IModel';
import { ErrorTypes } from '../errors/catalog';

abstract class MongoModel<T> implements IModel<T> {
  protected _model: Model<T>;

  constructor(model: Model<T>) {
    this._model = model;
  }

  async delete(_id: string): Promise<T | null> {
    if (!isValidObjectId(_id)) {
      throw new Error(ErrorTypes.InvalidId);
    }
    const deleteCar = this._model.findByIdAndDelete(_id);

    return deleteCar;
  }

  async update(_id: string, obj: T): Promise<T | null> {
    if (!isValidObjectId(_id)) {
      throw new Error(ErrorTypes.InvalidId);
    }
    
    if (!obj) {
      throw new Error(ErrorTypes.NotFound);
    }

    const update = await this._model.findByIdAndUpdate(_id, obj);
    return update;
  }
  
  async readOne(_id: string): Promise<T | null> {
    if (!isValidObjectId(_id)) {
      throw new Error(ErrorTypes.InvalidId);
    }
    return this._model.findById(_id);
  }

  async read(): Promise<T[]> {
    const response = await this._model.find();
    return response;
  }

  async create(obj: T): Promise<T> {
    const response = await this._model.create({ ...obj });
    return response;
  }
}

export default MongoModel;