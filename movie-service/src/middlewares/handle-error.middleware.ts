import { NextFunction, Request, Response } from 'express';

export const HandleErrorMiddleware = (err: Error, req: Request, res: Response<Error>, next: NextFunction) => {
  console.error(err);
  res.status(500).send({ message: err.message, name: err.name });
};
