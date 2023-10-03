import createClient from 'openapi-fetch';
import { useInfiniteQuery } from 'react-query';
import { MovieServiceOpenapi } from 'shared';
import { MovieServiceSearchMoviesPathType, MovieServiceSearchMoviesResponseDto } from '../../types';

export const useSearchMoviesQuery = (query: string) => {
  const pageLength = 20;
  const path: MovieServiceSearchMoviesPathType = '/api/movie-service/search-movies';

  const { GET } = createClient<MovieServiceOpenapi.paths>({
    headers: { authorization: process.env.REACT_APP_JWT_TEMP },
  });

  return useInfiniteQuery<MovieServiceSearchMoviesResponseDto, Error>(
    [path, query],
    async ({ pageParam = 1 }) => {
      const fetchResponse = await GET(path, {
        params: {
          query: {
            page: pageParam,
            query,
          },
        },
      });

      if (fetchResponse.data) {
        return fetchResponse.data;
      }

      throw new Error(fetchResponse.error.message);
    },
    {
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage.movies.length < pageLength) {
          return undefined;
        }

        return allPages.length + 1;
      },
      enabled: query.length > 2,
    },
  );
};
