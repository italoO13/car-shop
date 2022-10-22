import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import { catalogErrors, ErrorTypes } from '../errors/catalog';

const errorHandler: ErrorRequestHandler = (
  err: Error | ZodError,
  _req, 
  res, 
  _next,
) => {
  if (err instanceof ZodError) {
    return res.status(400).json({ message: err.issues });
  }

  const messageASErrorType = err.message as ErrorTypes;
  const mappedError = catalogErrors[messageASErrorType];

  if (mappedError) {
    return res.status(mappedError.httpStatus).json({ error: mappedError.message });
  }
  console.log(err);
  return res.status(500).json({ message: 'internal erro' });
};

export default errorHandler;