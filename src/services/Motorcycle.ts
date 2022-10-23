import { IModel } from '../interfaces/IModel';
import IService from '../interfaces/IService';
import { IMotorcycle, MotorcycleZodSchema } from '../interfaces/IMotorcycle';
import { ErrorTypes } from '../errors/catalog';

class MotorService implements IService<IMotorcycle> {
  readonly _model: IModel<IMotorcycle>;

  constructor(model:IModel<IMotorcycle>) {
    this._model = model;
  }
  
  async create(obj: unknown): Promise<IMotorcycle> {
    const parsed = MotorcycleZodSchema.safeParse(obj);
    
    if (!parsed.success) {
      throw parsed.error;
    }

    return this._model.create(obj as IMotorcycle);
  }

  async read(): Promise<IMotorcycle[]> {
    const readMotor = await this._model.read();
    return readMotor;
  }

  async readOne(_id: string): Promise<IMotorcycle> {
    const motor = await this._model.readOne(_id);
    if (!motor) throw Error(ErrorTypes.NotFound);
    return motor;
  }

  async update(_id: string, obj: unknown): Promise<IMotorcycle> {
    const parsed = MotorcycleZodSchema.safeParse(obj);
    if (!parsed.success) {
      throw parsed.error;
    }
    const motor = await this._model.update(_id, obj as IMotorcycle);

    if (!motor) {
      throw new Error(ErrorTypes.NotFound);
    }

    return motor;
  }

  async delete(_id: string): Promise<IMotorcycle> {
    const deleteMotor = await this._model.delete(_id);
    if (!deleteMotor) {
      throw new Error(ErrorTypes.NotFound);
    }
    return deleteMotor;
  }
}

export default MotorService;