import * as mongoose from 'mongoose';

export const RestaurantSchema = new mongoose.Schema({
  fantasyName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  status: { type: Boolean, default: false },
});

export interface Restaurant {
  id: number;
  fantasyName: string;
  email: string;
  password: string;
  phone: string;
  status: boolean;
}
