import { MovieServiceOpenapi } from 'shared';

export type MovieServiceSearchMoviesPathType = keyof Pick<
  MovieServiceOpenapi.paths,
  '/api/movie-service/search-movies'
>;
