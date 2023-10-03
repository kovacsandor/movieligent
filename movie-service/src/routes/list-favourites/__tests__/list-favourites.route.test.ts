import { describe, expect, test } from '@jest/globals';
import { agent } from 'supertest';
import { app } from '../../../app';
import { GetTestHeadersHelper } from '../../../helpers';
import * as CreateFavouriteTypes from '../../create-favourite/types';
import { MethodType, PathType, ResponseType } from '../types';

describe('ListFavouritesRoute', () => {
  test('can list favourites', async () => {
    const getHeaders = GetTestHeadersHelper();
    const createMethod: CreateFavouriteTypes.MethodType = 'post';
    const createPath: CreateFavouriteTypes.PathType = '/api/movie-service/favourites';
    const createRequestBody: CreateFavouriteTypes.RequestType = {
      id: 555879,
      overview: 'overview',
      releaseDate: '1998-12-31',
      title: 'Matrix',
    };

    const { body: createResponse } = await agent(app)
      [createMethod](createPath)
      .set(getHeaders())
      .send(createRequestBody);

    const isCreateResponse = (value: unknown): value is CreateFavouriteTypes.ResponseType => typeof value === 'object';
    if (!isCreateResponse(createResponse) || createResponse.requestStatus !== 'Success') {
      throw new Error('Unexpected failure');
    }

    const method: MethodType = 'get';
    const path: PathType = '/api/movie-service/favourites';

    const { body } = await agent(app)[method](path).set(getHeaders());

    const isResponseType = (value: unknown): value is ResponseType => typeof value === 'object';
    if (!isResponseType(body) || body.requestStatus !== 'Success') {
      throw new Error('Unexpected failure');
    }

    const [first] = body.favourites;

    expect(body.favourites).toHaveLength(1);
    expect(first.id).toBe(createResponse.favourite.id);
    expect(first.movieId).toBe(createResponse.favourite.movieId);
    expect(first.overview).toBe(createResponse.favourite.overview);
    expect(first.releaseDate).toBe(createResponse.favourite.releaseDate);
    expect(first.title).toBe(createResponse.favourite.title);
    expect(first.userId).toBe(createResponse.favourite.userId);
  });
});
