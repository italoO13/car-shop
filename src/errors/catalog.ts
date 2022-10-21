export enum ErrorTypes {
  BadRequest = 'BadRequest',
}

type ErrorResponseObject = {
  message: string, 
  httpStatus:number
};

export type ErrorCatalog = {
  [key in ErrorTypes]: ErrorResponseObject

};