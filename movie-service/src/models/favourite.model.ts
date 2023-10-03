import { model, Schema } from 'mongoose';
import { FavouriteDocumentType } from '../types';

const favouriteSchema = new Schema({
  title: {
    required: true,
    type: String,
  },
  overview: {
    type: String,
  },
  releaseDate: {
    type: Date,
  },
  movieId: {
    required: true,
    type: Number,
    unique: true,
  },
  userId: {
    required: true,
    type: String,
  },
});

export const FavouriteModel = model<FavouriteDocumentType>('Favourite', favouriteSchema);
