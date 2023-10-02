import { NextFunction, Request, Response } from 'express';
import { ParamsDictionary, Query } from 'express-serve-static-core';
import { JwtPayload, decode, sign } from 'jsonwebtoken';
import { mongo } from 'mongoose';
import { MovieServiceOpenapi } from 'shared';

type UnauthorizedLocalsType = {
  userId?: string;
};

type ServiceError = MovieServiceOpenapi.components['schemas']['ServiceError'];

export const AuthoriseUserMiddleware = <
  P = ParamsDictionary,
  ResBody = any,
  ReqBody = any,
  ReqQuery = Query,
  Locals extends Record<string, any> = Record<string, any>,
>(
  req: Request<P, ResBody, ReqBody, ReqQuery, Locals>,
  res: Response<ResBody | ServiceError, UnauthorizedLocalsType>,
  next: NextFunction,
) => {
  const userId = new mongo.ObjectId().toHexString();

  const payload: JwtPayload = { sub: userId };
  const signed = sign(payload, process.env.JWT_SECRET);

  const { sub } = decode(signed);

  if (typeof sub !== 'string') {
    return res.status(401).send({ message: 'Unauthorised user', requestStatus: 'Failure' });
  }

  res.locals.userId = sub;

  next();
};
