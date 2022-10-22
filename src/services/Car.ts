import { ICar, CarZodSchema } from '../interfaces/ICar';
import IService from '../interfaces/IService';
import { IModel } from '../interfaces/IModel';
import { ErrorTypes } from '../errors/catalog';

class CarService implements IService<ICar> {
  readonly _model : IModel<ICar>;

  constructor(model:IModel<ICar>) {
    this._model = model;
  }

  async update(_id:string, obj:unknown):Promise<ICar> {
    const parsed = CarZodSchema.safeParse(obj);
    if (!parsed.success) {
      throw parsed.error;
    }
    const updateCar = await this._model.update(_id, obj as ICar);

    if (!updateCar) throw new Error(ErrorTypes.NotFound);
    return updateCar;
  }

  async readOne(_id:string):Promise<ICar> {
    const car = await this._model.readOne(_id);
    if (!car) throw new Error(ErrorTypes.NotFound);
    return car;
  }

  async read():Promise<ICar[]> {
    return this._model.read();
  }

  async create(obj: unknown): Promise<ICar> {
    const parsed = CarZodSchema.safeParse(obj);

    if (!parsed.success) {
      throw parsed.error;
    }

    return this._model.create(obj as ICar);
  }
}

export default CarService;