import { MovieServiceOpenapi } from 'shared';

export type PathType = keyof Pick<MovieServiceOpenapi.paths, '/api/movie-service/favourites'>;
