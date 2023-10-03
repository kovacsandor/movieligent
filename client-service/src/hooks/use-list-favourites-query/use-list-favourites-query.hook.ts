import createClient from 'openapi-fetch';
import { useQuery } from 'react-query';
import { MovieServiceOpenapi } from 'shared';
import { MovieServiceListFavouritesPath, MovieServiceListFavouritesResponseDto } from '../../types';

export const useListFavouritesQuery = () => {
  const path: MovieServiceListFavouritesPath = '/api/movie-service/favourites';

  const { GET } = createClient<MovieServiceOpenapi.paths>();

  return useQuery<MovieServiceListFavouritesResponseDto, Error>(path, async () => {
    const fetchResponse = await GET(path, { headers: { authorization: process.env.REACT_APP_JWT_TEMP } });

    if (fetchResponse.data) {
      return fetchResponse.data;
    }

    throw new Error(fetchResponse.error.message);
  });
};
