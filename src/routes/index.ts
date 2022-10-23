import { Router } from 'express';
import carRouter from './carRoute';
import motorRouter from './motorRouter';

const route = Router();

route.use('/cars', carRouter);
route.use('/motorcycles', motorRouter);

export default route;