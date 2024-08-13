import { Controller, Get, Post, Body, Param, HttpException, HttpStatus, HttpCode, Put, Patch, Delete, UseGuards } from "@nestjs/common";
import { Product } from "./entities/product.entity";
import { ProductService } from "./product.service";
import { ApiResponse } from "src/api_response/api-response.dto";
import { AuthGuard } from "src/auth/auth.guard";

@Controller('/api/v1/products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('/new')
  @UseGuards(AuthGuard)
  async createProduct(@Body() body: any): Promise<ApiResponse<Product>> {
    const { title, price, categoryId, restaurantId, availability } = body;
    return await this.productService.createProduct(title, price, categoryId, restaurantId, availability);
  } 

  @Get('/all/restaurant/:restaurantId')
  async getAllProducts(@Param("restaurantId") restaurantId: string): Promise<ApiResponse<Product[]>> {
    return this.productService.getAllProducts(restaurantId);
  }

  @Get(':id')
  async getProductById(@Param('id') id: string): Promise<ApiResponse<Product>> {
    return await this.productService.getProductById(String(id));
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  async updateProduct(@Param('id') id: string, @Body() body: any): Promise<ApiResponse<Product>> {
    return await this.productService.updateProduct(String(id), body);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async deleteProduct(@Param('id') id: string): Promise<ApiResponse<Product>> {
    return this.productService.deleteProduct(String(id));
  }
}