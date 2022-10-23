import { model as mongooseCreateModel, Schema } from 'mongoose';
import { categoryCar, IMotorcycle } from '../interfaces/IMotorcycle';
import MongoModel from './MongoModel';

const MotorcycleMongooseSchema = new Schema<IMotorcycle>({
  model: String,
  year: Number, 
  color: String, 
  status: Boolean, 
  buyValue: Number,
  category: {
    type: String,
    enum: categoryCar,
  },
  engineCapacity: Number,
}, { versionKey: false });

class Motorcycle extends MongoModel<IMotorcycle> {
  constructor(model = mongooseCreateModel('Motorcycle', MotorcycleMongooseSchema)) {
    super(model);
  }
}

export default Motorcycle;