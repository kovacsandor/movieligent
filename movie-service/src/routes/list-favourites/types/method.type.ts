import { MovieServiceOpenapi } from 'shared';

export type MethodType = keyof Pick<MovieServiceOpenapi.paths['/api/movie-service/favourites'], 'get'>;
