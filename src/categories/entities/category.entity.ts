import * as mongoose from 'mongoose';

export const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  restaurant: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true },
});

export interface Category {
  id: number;
  name: string;
  restaurant: mongoose.Schema.Types.ObjectId;
}
