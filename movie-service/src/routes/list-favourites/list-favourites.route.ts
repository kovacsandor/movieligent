import { NextFunction, Request, Response, Router } from 'express';
import { AuthoriseUserMiddleware } from '../../middlewares';
import { FavouriteModel } from '../../models';
import { AuthorisedLocalsType, FavouriteDocumentType, FavouriteType } from '../../types';
import { MethodType, PathType, ResponseType } from './types';

const path: PathType = '/api/movie-service/favourites';
const method: MethodType = 'get';

export const ListFavouritesRoute = Router();

ListFavouritesRoute[method](
  path,
  AuthoriseUserMiddleware,
  async (req: Request<{}, ResponseType>, res: Response<ResponseType, AuthorisedLocalsType>, next: NextFunction) => {
    try {
      const filter: Partial<FavouriteType> = { userId: res.locals.userId };
      const documents = await FavouriteModel.find<FavouriteDocumentType>(filter);

      const response: ResponseType = {
        requestStatus: 'Success',
        favourites: documents.map((document) => {
          const json = document.toJSON();
          return {
            id: json._id.toHexString(),
            movieId: json.movieId,
            overview: json.overview,
            releaseDate: json.releaseDate?.toISOString(),
            title: json.title,
            userId: json.userId,
          };
        }),
      };

      return res.status(200).send(response);
    } catch (error) {
      return next(error);
    }
  },
);
