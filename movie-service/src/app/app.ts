import { json } from 'body-parser';
import express, { Request } from 'express';
import { MovieServiceHeartbeatResponseDto, MovieServiceOpenapi } from 'shared';
import { FavouriteModel } from '../models';
import { FavouriteDocumentType, FavouriteType } from '../types';

export const app = express();

app.get('/api/movie-service/heartbeat', (req, res) => {
  const resp: MovieServiceHeartbeatResponseDto = { message: 'App is working' };
  res.status(200).json(resp);
});

app.use(json());

const path: keyof Pick<MovieServiceOpenapi.paths, '/api/movie-service/favourite'> = '/api/movie-service/favourite';
const method: keyof Pick<MovieServiceOpenapi.paths['/api/movie-service/favourite'], 'post'> = 'post';

app[method](
  path,
  async (
    req: Request<
      {},
      MovieServiceOpenapi.components['schemas']['MovieServiceCreateFavouriteResponseDto'],
      MovieServiceOpenapi.components['schemas']['MovieServiceCreateFavouriteRequestDto']
    >,
    res,
  ) => {
    try {
      console.log('To be implemented', req.body.id);

      const doc: FavouriteType = {
        title: 'Favourite ' + Math.random(),
        userId: 'userId ' + Math.random(),
      };

      const document = new FavouriteModel(doc);
      const favourite: FavouriteDocumentType = await document.save();
      const json = favourite.toJSON();

      const respose: MovieServiceOpenapi.components['schemas']['MovieServiceCreateFavouriteResponseDto'] = {
        id: json._id.toString(),
        title: json.title,
      };

      res.status(201).json(respose);
    } catch (error) {
      res.send(error);
    }
  },
);

app.get('/api/movie-service/favourites', async (req, res) => {
  const favourites = await FavouriteModel.find();
  res.status(200).json({ favourites });
});
