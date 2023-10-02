import { json } from 'body-parser';
import express from 'express';
import { HandleErrorMiddleware } from '../middlewares';
import { SearchMoviesRoute } from '../routes';

export const app = express();

app.use(json());
app.use(SearchMoviesRoute);
app.use(HandleErrorMiddleware);
