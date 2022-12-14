export enum StatusCodes {
  OK = 200,
  CREATED = 201,

  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  UNPROCESSABLE_ENTITY = 422,
  INTERNAL = 500,
}

export type OrderTypes = 'desc' | 'asc';
