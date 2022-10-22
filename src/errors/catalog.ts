export enum ErrorTypes {
  BadRequest = 'BadRequest',
  NotFound = 'NotFound',
  InvalidId = 'InvalidId',
}

type ErrorResponseObject = {
  message: string, 
  httpStatus:number
};

export type ErrorCatalog = {
  [key in ErrorTypes]: ErrorResponseObject
};

export const catalogErrors:ErrorCatalog = {
  BadRequest: {
    message: 'Bad Request',
    httpStatus: 400,
  },
  NotFound: {
    message: 'Object not found',
    httpStatus: 404,
  },
  InvalidId: {
    message: 'Id must have 24 hexadecimal characters',
    httpStatus: 400,
  },
};