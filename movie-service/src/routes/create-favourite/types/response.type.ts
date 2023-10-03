import { MovieServiceOpenapi } from 'shared';

export type ResponseType = Responses[keyof Responses]['content']['application/json'];
type Responses = MovieServiceOpenapi.paths['/api/movie-service/favourites']['post']['responses'];
