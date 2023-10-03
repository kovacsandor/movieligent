import axios from 'axios';
import { NextFunction, Request, Response, Router } from 'express';
import { AuthoriseUserMiddleware } from '../../middlewares';
import { AuthorisedLocalsType } from '../../types';
import { serialiseParamsUtil } from '../../utils';
import {
  MethodType,
  PathType,
  QueryParamsType,
  ResponseType,
  TmdbMovieSearchQueryParams,
  TmdbMovieSearchResponse,
} from './types';

const path: PathType = '/api/movie-service/search-movies';
const method: MethodType = 'get';

export const SearchMoviesRoute = Router();

SearchMoviesRoute[method](
  path,
  AuthoriseUserMiddleware,
  async (
    req: Request<{}, ResponseType, {}, QueryParamsType>,
    res: Response<ResponseType, AuthorisedLocalsType>,
    next: NextFunction,
  ) => {
    const { page, query } = req.query;

    const getValidationMessage = (): string => {
      if (query.length < 3) {
        return 'Query must be at least 3 characters long';
      }

      if (page < 1) {
        return 'Page must be at least 1';
      }

      if (page % 1 !== 0) {
        return 'Page must be a whole number';
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

    const params: TmdbMovieSearchQueryParams = {
      query,
      include_adult: false,
      page,
    };

    const serialised = serialiseParamsUtil(params);
    const url = `https://api.themoviedb.org/3/search/movie?${serialised}`;

    try {
      const { data } = await axios.get<TmdbMovieSearchResponse>(url, {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${process.env.TMDB_AUTH}`,
        },
      });

      const response: ResponseType = {
        requestStatus: 'Success',
        movies: data.results.map((item) => ({
          id: item.id,
          title: item.title,
          overview: item.overview,
          releaseDate: item.release_date,
        })),
      };

      return res.status(200).send(response);
    } catch (error) {
      return next(error);
    }
  },
);
