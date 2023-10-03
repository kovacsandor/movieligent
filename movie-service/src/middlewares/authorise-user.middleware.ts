import { NextFunction, Request, Response } from 'express';
import { ParamsDictionary, Query } from 'express-serve-static-core';
import { verify } from 'jsonwebtoken';
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
  try {
    const verified = verify(req.headers.authorization, process.env.JWT_SECRET);

    if (typeof verified === 'string') {
      res.locals.userId = verified;
    }

    if (typeof verified !== 'string') {
      res.locals.userId = verified.sub;
    }
  } catch (error) {
    return res.status(401).send({ message: 'Unauthorised user', requestStatus: 'Failure' });
  }

  next();
};
