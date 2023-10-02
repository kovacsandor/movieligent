import { describe, expect, test } from '@jest/globals';
import { AxiosResponse } from 'axios';
import { agent } from 'supertest';
import { app } from '../../../app';
import { MethodType, PathType, QueryParamsType, ResponseType, TmdbMovieSearchResultItem } from '../types';

const path: PathType = '/api/movie-service/search-movies';
const method: MethodType = 'get';

const mockAxiosGet = jest.fn();
jest.mock('axios', () => ({
  get: (url: string) => {
    mockAxiosGet.mockImplementation((args) => {
      const response: Partial<AxiosResponse<{ readonly results: readonly Partial<TmdbMovieSearchResultItem>[] }>> = {
        data: {
          results: [
            {
              id: 555879,
              overview: 'overview',
              release_date: '1998-12-31',
              title: 'Matrix',
              adult: false,
            },
          ],
        },
      };
      return Promise.resolve(response);
    });

    return mockAxiosGet(url);
  },
}));

describe('SearchMoviesRoute', () => {
  test('calls tmdb with the correct parameters', async () => {
    const params: QueryParamsType = {
      page: 1,
      query: 'matrix',
    };

    await agent(app)[method](path).query(params);

    expect(mockAxiosGet).toBeCalledWith(
      'https://api.themoviedb.org/3/search/movie?query=matrix&include_adult=false&page=1',
    );
  });

  test('returns the data received from tmdb correctly', async () => {
    const params: QueryParamsType = {
      page: 1,
      query: 'matrix',
    };

    const { body } = await agent(app)[method](path).query(params);

    const expected: ResponseType = {
      requestStatus: 'Success',
      movies: [
        {
          id: 555879,
          overview: 'overview',
          releaseDate: '1998-12-31',
          title: 'Matrix',
        },
      ],
    };
    expect(body).toEqual(expected);
  });
});
