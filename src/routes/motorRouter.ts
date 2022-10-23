import { Router } from 'express';
import MotorController from '../controllers/Motorcycle';
import MotorService from '../services/Motorcycle';
import MotorModel from '../models/Motorcycle';

const route = Router();

const motor = new MotorModel();
const motorService = new MotorService(motor);
const motorController = new MotorController(motorService);

route.post('/', motorController.create);
route.get('/', motorController.read);
route.get('/:id', motorController.readOne);
route.put('/:id', motorController.update);
route.delete('/:id', motorController.delete);

export default route;