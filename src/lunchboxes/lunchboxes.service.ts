import { Injectable } from '@nestjs/common';
import { UpdateLunchboxDto } from './dto/update-lunchbox.dto';
import { InjectModel } from '@nestjs/mongoose';
import {Model, Types} from 'mongoose';
import { ApiResponse } from 'src/api_response/api-response.dto';
import { Lunchbox } from './entities/lunchbox.entity';

@Injectable()
export class LunchboxesService {
  constructor(@InjectModel('Lunchbox') private readonly lunchboxModel: Model<Lunchbox>) {}

  async createLunchbox(type: string, size: number, price: number, productsIds: string[] = [], categoryIds: string[] = []): Promise<ApiResponse<Lunchbox>> {
    try {
      const productObjectIds = productsIds.map(id => new Types.ObjectId(id));
      const categoryObjectIds = categoryIds.map(id => new Types.ObjectId(id));
  
      const existingLunchbox = await this.lunchboxModel.findOne({ price }).exec();
  
      if (existingLunchbox) {
        throw new Error('Lunchbox already exists');
      }
  
      const newLunchbox = new this.lunchboxModel({
        type,
        size,
        price,
        products: productObjectIds.length ? productObjectIds : undefined,
        categories: categoryObjectIds.length ? categoryObjectIds : undefined,
      });
  
      const result = await newLunchbox.save();
  
      return new ApiResponse(true, 'Lunchbox created successfully', result.toObject() as Lunchbox);
    } catch (error) {
      return new ApiResponse(false, error.message);
    }
  }
  
  
  

  async getAllLunchboxes(): Promise<ApiResponse<Lunchbox[]>> {
    try {
      const lunchboxes = await this.lunchboxModel.find().exec();
      return new ApiResponse(true, 'Lunchboxes found', lunchboxes.map(lunchbox => lunchbox.toObject() as Lunchbox));
    } catch (error) {
      return new ApiResponse(false, error.message);
    }
  }
  

  async getLunchboxById(id: string): Promise<ApiResponse<Lunchbox>> {
    try {
      const lunchbox = await this.lunchboxModel.findById(id).exec();
  
      if (!lunchbox) {
        throw new Error('Lunchbox not found');
      }
  
      return new ApiResponse(true, 'Lunchbox found', lunchbox.toObject() as Lunchbox);
    } catch (error) {
      return new ApiResponse(false, error.message);
    }
  }
  

  async deleteLunchbox(id: string): Promise<ApiResponse<Lunchbox>> {
    try {
      const lunchbox = await this.lunchboxModel.findByIdAndDelete(id).exec();
  
      if (!lunchbox) {
        throw new Error('Lunchbox not found');
      }
  
      return new ApiResponse(true, 'Lunchbox deleted', lunchbox.toObject() as Lunchbox);
    } catch (error) {
      return new ApiResponse(false, error.message);
    }
  }
   
}
