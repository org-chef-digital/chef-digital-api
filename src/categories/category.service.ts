import { Injectable } from '@nestjs/common';
import { Category } from './entities/category.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ApiResponse } from '../api_response/api-response.dto';

@Injectable()
export class CategoryService {
  constructor(@InjectModel('Category') private readonly categoryModel: Model<Category>) {}

  async createCategory(
    name: string
  ): Promise<ApiResponse<Category>> {
    try {
      const existingCategory = await this.categoryModel.findOne({ name }).exec();
      if (existingCategory) {
        throw new Error('Category already exists');
      }

      const newCategory = new this.categoryModel({
        name,
      });

      const result = await newCategory.save();

      return new ApiResponse(true, 'Category created sucessfully', result.toObject() as Category);
    } catch (error) {
      return new ApiResponse(false, error.message);
    }  
  }

  async getCategoryById(id: string): Promise<ApiResponse<Category>>  {
    try {
      const category = await this.categoryModel.findById(id).exec();
    if (!category) {
      throw new Error('Category not found');
    }

    return new ApiResponse(true, 'Category found', category.toObject() as Category);
    
    } catch (error) {
    return new ApiResponse(false, error.message);
    }
  }

  async getAllCategories(): Promise<ApiResponse<Category[]>> {
    try {
      const categories = await this.categoryModel.find().exec();
      return new ApiResponse(true, 'Categories found', categories.map(category => category.toObject() as Category));
    } catch (error) {
      return new ApiResponse(false, error.message);
    }
  }

  async updateCategory(id: string, updateData: Partial<Category>): Promise<ApiResponse<Category>> {
    try {
      const category = await this.categoryModel.findByIdAndUpdate(id, updateData, {new: true}).exec();
      if (!category) {
          throw new Error('Category not found');
      }
      return new ApiResponse(true, 'Category updated', category.toObject() as Category);
    } catch (error) {
      return new ApiResponse(false, error.message);      
    }
  }
  
  async deleteCategory(id: string): Promise<ApiResponse<Category>> {
    try {
      const category = await this.categoryModel.findByIdAndDelete(id).exec();
      if (!category) {
        throw new Error('Category not found');
      }
      return new ApiResponse(true, 'Category deleted', category.toObject() as Category);
    } catch (error) {
      return new ApiResponse(false, error.message);
    }
  }

}