import { Controller, Get, Post, Body, Param, HttpStatus, HttpCode, Put, Delete, UseGuards } from '@nestjs/common';
import { Category } from './entities/category.entity';
import { CategoryService } from './category.service';
import { ApiResponse } from '../api_response/api-response.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('/api/v1/categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  @UseGuards(AuthGuard)
  async createCategory(@Body() body: any): Promise<ApiResponse<Category>> {
    const { name, restaurantId } = body;
    return await this.categoryService.createCategory(name, restaurantId);
  }

  @Get('/restaurant/:restaurantId')
  async getAllCategories(@Param('restaurantId') restaurantId: string): Promise<ApiResponse<Category[]>> {
    return await this.categoryService.getAllCategories(restaurantId);
  }

  @Get(':id')
  async getCategoryById(@Param('id') id: string): Promise<ApiResponse<Category>> {
    return await this.categoryService.getCategoryById(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  async updateCategory(@Param('id') id: string, @Body() body: any): Promise<ApiResponse<Category>> {
    return await this.categoryService.updateCategory(id, body);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async deleteCategory(@Param('id') id: string): Promise<ApiResponse<Category>> {
    return await this.categoryService.deleteCategory(id);
  }
}
