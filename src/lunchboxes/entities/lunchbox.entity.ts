import * as mongoose from 'mongoose';

export const LunchboxSchema = new mongoose.Schema({
    type: { type: String, required: true },
    size: { type: Number, required: true },
    price: { type: Number, required: true },
    products: [{type: mongoose.Schema.Types.ObjectId, ref: 'Product'}], 
})

export interface Lunchbox {
    id: number;
    type: string;
    size: number;
    price: number;
    products: string[];
}