import express from 'express';
import errorHandler from './middleware/error';
import route from './routes';

const app = express();
app.use(express.json());
app.use('/', route);
app.use(errorHandler);

export default app;
