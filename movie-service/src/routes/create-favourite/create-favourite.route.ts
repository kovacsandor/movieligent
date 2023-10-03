import { NextFunction, Request, Response, Router } from 'express';
import { AuthoriseUserMiddleware } from '../../middlewares';
import { FavouriteModel } from '../../models';
import { AuthorisedLocalsType, FavouriteDocumentType, FavouriteType } from '../../types';
import { MethodType, PathType, RequestType, ResponseType } from './types';

const path: PathType = '/api/movie-service/favourites';
const method: MethodType = 'post';

export const CreateFavouriteRoute = Router();

CreateFavouriteRoute[method](
  path,
  AuthoriseUserMiddleware,
  async (
    req: Request<{}, ResponseType, RequestType>,
    res: Response<ResponseType, AuthorisedLocalsType>,
    next: NextFunction,
  ) => {
    const { id, releaseDate, title, overview } = req.body;

    const getValidationMessage = (): string => {
      if (!id || !title) {
        return 'Bad request';
      }

      return '';
    };

    const message = getValidationMessage();

    if (message) {
      return res.status(400).send({
        message,
        requestStatus: 'Failure',
      });
    }

    const favourite: FavouriteType = {
      movieId: id,
      releaseDate: releaseDate ? new Date(releaseDate) : null,
      title,
      userId: res.locals.userId,
      overview,
    };

    const document: FavouriteDocumentType = new FavouriteModel(favourite);

    try {
      const saved = await document.save();
      const json = saved.toJSON();

      const response: ResponseType = {
        requestStatus: 'Success',
        favourite: {
          id: json._id.toHexString(),
          movieId: json.movieId,
          overview: json.overview,
          releaseDate: json.releaseDate?.toISOString(),
          title: json.title,
          userId: json.userId,
        },
      };

      return res.status(201).send(response);
    } catch (error) {
      return next(error);
    }
  },
);
