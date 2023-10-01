import { model, Schema } from 'mongoose';
import { FavouriteDocumentType } from '../types';

const favouriteSchema = new Schema({
  title: {
    required: true,
    type: String,
  },
  userId: {
    required: true,
    type: String,
  },
});

export const FavouriteModel = model<FavouriteDocumentType>('Favourite', favouriteSchema);
