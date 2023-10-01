import { describe, expect, test } from '@jest/globals';
import { agent } from 'supertest';
import { app } from '../app';

describe('app', () => {
  test('is working', async () => {
    const { body } = await agent(app).get('/api/movie-service/heartbeat');

    expect(body).toEqual({ message: 'App is working' });
  });

  test('can add favourite', async () => {
    const { body } = await agent(app).post('/api/movie-service/favourite').send({ id: 'afsf' });

    console.log(body);

    expect(body).toBeDefined();
  });

  test('can retrieve favourite', async () => {
    try {
      await agent(app).post('/api/movie-service/favourite').send({ id: 'afsf' });
    } catch (error) {
      console.log(error);
    }
    const { body } = await agent(app).get('/api/movie-service/favourites');

    expect(body.favourites).toHaveLength(1);
  });
});
