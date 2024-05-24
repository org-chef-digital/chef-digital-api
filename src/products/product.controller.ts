import { Controller, Get, Post, Body, Param, HttpException, HttpStatus, HttpCode, Put, Patch, Delete } from "@nestjs/common";
import { Product } from "./entities/product.entity";
import { ProductService } from "./product.service";
import { ApiResponse } from "src/api_response/api-response.dto";

@Controller('/api/v1/products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('/new')
  async createProduct(@Body() body: any): Promise<ApiResponse<Product>> {
    const { title, price, categoryId, restaurantId, availability } = body;
    return await this.productService.createProduct(title, price, categoryId, restaurantId, availability);
  } 

  @Get('/all')
  async getAllProducts(): Promise<ApiResponse<Product[]>> {
    return this.productService.getAllProducts();
  }

  @Get(':id')
  async getProductById(@Param('id') id: string): Promise<ApiResponse<Product>> {
    return await this.productService.getProductById(String(id));
  }

  @Put(':id')
  async updateProduct(@Param('id') id: string, @Body() body: any): Promise<ApiResponse<Product>> {
    return await this.productService.updateProduct(String(id), body);
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: string): Promise<ApiResponse<Product>> {
    return this.productService.deleteProduct(String(id));
  }
}