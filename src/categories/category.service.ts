import { Injectable } from '@nestjs/common';
import { Category } from './entities/category.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CategoryService {
  constructor(@InjectModel('Category') private readonly categoryModel: Model<Category>) {}

  async createCategory(
    name: string
  ): Promise<Category> {
    const existingCategory = await this.categoryModel.findOne({ name }).exec();
    if (existingCategory) {
        throw new Error('Category already exists');
    }

    const newCategory = new this.categoryModel({
        name
    });

    const result = await newCategory.save();
    return result.toObject() as Category;
  }

  async getCategoryById(id: string): Promise<Category>  {
    const category = await this.categoryModel.findById(id).exec();
    if (!category) {
      throw new Error('Category not found');
    }
    return {
      id: category.id,
      name: category.name,
    };
  }

  async getAllCategories(): Promise<Category[]> {
    const categories = await this.categoryModel.find().exec();
    return categories.map((categories) => ({
        id: categories.id,
        name: categories.name
    }))
  }

  async updateCategory(id: string, updateData: Partial<Category>): Promise<Category> {
    const category = await this.categoryModel.findByIdAndUpdate(id, updateData, {new: true}).exec();
    if (!category) {
        throw new Error('Category not found');
    }
    return category.toObject() as Category;
  }

  async deleteCategory(id: string): Promise<Category> {
    const category = await this.categoryModel.findByIdAndDelete(id, {new: true}).exec();
    if (!category) {
        throw new Error('Category not exist');
    }
    return category;
  }
}