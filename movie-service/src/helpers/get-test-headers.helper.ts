import { IncomingHttpHeaders } from 'http';
import { sign } from 'jsonwebtoken';
import { mongo } from 'mongoose';

export const GetTestHeadersHelper = () => {
  const userId = new mongo.ObjectId().toHexString();

  return () => {
    const signed = sign(userId, process.env.JWT_SECRET);

    const headers: IncomingHttpHeaders = {
      authorization: signed,
      accept: 'application/json',
    };

    return headers;
  };
};
