import { Request } from 'express';

export type RequestWithBody<T> = Request<
  NonNullable<unknown>,
  NonNullable<unknown>,
  T
>;
export type RequestWithParams<T> = Request<T>;
