import { describe, expect, test } from '@jest/globals';
import { agent } from 'supertest';
import { app } from '../../../app';
import { GetTestHeadersHelper } from '../../../helpers';
import { MethodType, PathType, RequestType, ResponseType } from '../types';

describe('CreateFavouriteRoute', () => {
  test('can create favourite', async () => {
    const getHeaders = GetTestHeadersHelper();
    const method: MethodType = 'post';
    const path: PathType = '/api/movie-service/favourites';
    const requestBody: RequestType = {
      id: 555879,
      overview: 'overview',
      releaseDate: '1998-12-31',
      title: 'Matrix',
    };

    const { body } = await agent(app)[method](path).set(getHeaders()).send(requestBody);

    const isResponseType = (value: unknown): value is ResponseType => typeof value === 'object';

    if (!isResponseType(body) || body.requestStatus !== 'Success') {
      throw new Error('Unexpected failure');
    }

    expect(body.favourite.id).toBeDefined();
    expect(body.favourite.movieId).toBe(requestBody.id);
    expect(body.favourite.overview).toBe(requestBody.overview);
    expect(body.favourite.releaseDate).toBe(new Date(requestBody.releaseDate).toISOString());
    expect(body.favourite.title).toBe(requestBody.title);
    expect(body.favourite.userId).toBeDefined();
  });
});
