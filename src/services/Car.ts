import { ICar, CarZodSchema } from '../interfaces/ICar';
import IService from '../interfaces/IService';
import { IModel } from '../interfaces/IModel';

class CarService implements IService<ICar> {
  readonly _model : IModel<ICar>;

  constructor(model:IModel<ICar>) {
    this._model = model;
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