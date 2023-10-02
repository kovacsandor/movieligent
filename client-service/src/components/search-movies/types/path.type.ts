import { MovieServiceOpenapi } from 'shared';

export type Path = keyof Pick<MovieServiceOpenapi.paths, '/api/movie-service/search-movies'>;
