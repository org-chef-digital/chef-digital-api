import { Injectable } from "@nestjs/common";
import { Product } from "./entities/product.entity";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { ApiResponse } from "../api_response/api-response.dto";

@Injectable()
export class ProductService {
  constructor(@InjectModel('Product') private readonly productModel: Model<Product>) {}

  async createProduct(
    title: string,
    price: number,
    categoryId: string,
    availability: boolean,
  ): Promise<ApiResponse<Product>> {
    try {
      const categoryObjectId = new Types.ObjectId(categoryId);

      const existingProduct = await this.productModel.findOne({ title, category: categoryObjectId }).exec();
      if (existingProduct) {
        throw new Error('Product already exists');
      }

      const newProduct = new this.productModel({
        title,
        price,
        category: categoryObjectId,
        availability,
      });

      const result = await newProduct.save();

      return new ApiResponse(true, 'Product created successfully', result.toObject() as Product);
    } catch (error) {
      return new ApiResponse(false, error.message);
    }
  }

  async getAllProducts(): Promise<ApiResponse<Product[]>> {
    try {
      const products = await this.productModel.find().exec();
      return new ApiResponse(true, "Products found", products.map(product => product.toObject() as Product));
    } catch (error) {
      return new ApiResponse(false, error.message);
    }
  }

  async getAllProductsByCategory(categoryId: string): Promise<ApiResponse<Product[]>> {
    try {
      const categoryObjectId = new Types.ObjectId(categoryId);

        const products = await this.productModel.find({ category: categoryObjectId }).exec();
        return new ApiResponse(true, 'Products found', products.map(product => product.toObject() as Product));
    } catch (error) {
        return new ApiResponse(false, error.message);
    }
  }

  async getProductById(id: string): Promise<ApiResponse<Product>> {
    try {
        const product = await this.productModel.findById(id).exec();
        if (!product) {
            throw new Error('Product not found');
        }

        return new ApiResponse(true, 'Product found', product.toObject() as Product);
    } catch (error) {
        return new ApiResponse(false, error.message);
    }
  }

  async updateProduct(id: string, updateData: Partial<Product>): Promise<ApiResponse<Product>> {
    try {
        const product = await this.productModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
        if (!product) {
            throw new Error('Product not found');
        }

        return new ApiResponse(true, 'Product updated', product.toObject() as Product);

    } catch (error) {
        return new ApiResponse(false, error.message);
    }
  }

  async deleteProduct(id: string): Promise<ApiResponse<Product>> {
    try {
        const product = await this.productModel.findByIdAndDelete(id).exec();
        if (!product) {
            throw new Error('Product not found');
        }

        return new ApiResponse(true, 'Product deleted', product.toObject() as Product);
    } catch (error) {
        return new ApiResponse(false, error.message);
    }
  }
}
