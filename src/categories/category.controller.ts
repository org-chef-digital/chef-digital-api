import { Controller, Get, Post, Body, Param, HttpException, HttpStatus, HttpCode, Put, Patch, Delete } from '@nestjs/common';
import { Category } from './entities/category.entity';
import { error } from 'console';
import { CategoryService } from './category.service';
import { ApiResponse } from 'src/api_response/api-response.dto';

@Controller('/api/v1/categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async createCategory(@Body() body: any): Promise<ApiResponse<Category>> {
    const { name } = body;
    return await this.categoryService.createCategory(name);
  }

  @Get('/all')
  async getAllCategories(): Promise<ApiResponse<Category[]>> {
    return await this.categoryService.getAllCategories();
  }

  @Get(':id')
  async getCategoryById(@Param('id') id: string): Promise<ApiResponse<Category>> {
    return await this.categoryService.getCategoryById(String(id));
  }

  @Put(':id')
  async updateCategory(@Param('id') id: string, @Body() body: any): Promise<ApiResponse<Category>> {
    return await this.categoryService.updateCategory(String(id), body);
  }

  @Delete(':id')  
  async deleteCategory(@Param('id') id: string): Promise<ApiResponse<Category>> {
    return await this.categoryService.deleteCategory(id);
  }
}