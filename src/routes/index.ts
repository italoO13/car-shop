import { Router } from 'express';
import carRouter from './carRoute';

const route = Router();

route.use('/cars', carRouter);

export default route;