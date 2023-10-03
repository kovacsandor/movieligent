import createClient from 'openapi-fetch';
import { useMutation } from 'react-query';
import { MovieServiceOpenapi } from 'shared';
import { MovieServiceCreateFavouriteResponseDto, MovieServiceSearchMoviesResultItem } from '../../types';

export const useCreateFavouriteMutation = () => {
  const { POST } = createClient<MovieServiceOpenapi.paths>({
    headers: { authorization: process.env.REACT_APP_JWT_TEMP },
  });

  return useMutation<MovieServiceCreateFavouriteResponseDto, Error, MovieServiceSearchMoviesResultItem>(
    async (movie: MovieServiceSearchMoviesResultItem) => {
      const fetchResponse = await POST('/api/movie-service/favourites', {
        body: movie,
      });

      if (fetchResponse.data) {
        return fetchResponse.data;
      }

      throw new Error(fetchResponse.error.message);
    },
  );
};
