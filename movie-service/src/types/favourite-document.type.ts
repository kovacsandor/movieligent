import { Document, ObjectId } from 'mongoose';
import { FavouriteType } from './favourite.type';

export type FavouriteDocumentType = Document<ObjectId, {}, FavouriteType>;
