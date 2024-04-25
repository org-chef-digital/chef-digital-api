import { Controller, Get, Post, Body, Param, HttpException, HttpStatus, HttpCode, Put, Patch, Delete } from '@nestjs/common';
import { Category } from './entities/category.entity';
import { error } from 'console';
import { CategoryService } from './category.service';

@Controller('/api/v1/categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async createCategory(@Body() body: any): Promise<Category> {
    const { name } = body;
    return this.categoryService.createCategory(name);
  }

  @Get('/all')
  async getAllCategories(): Promise<Category[]> {
    return this.categoryService.getAllCategories();
  }

  @Get(':id')
  async getCategoryById(@Param('id') id: string): Promise<Category> {
    return this.categoryService.getCategoryById(String(id));
  }

  @Put(':id')
  async updateCategory(@Param('id') id: string, @Body() body: any): Promise<Category> {
    const updateCategory = await this.categoryService.updateCategory(String(id), body);
    if (!updateCategory) {
      throw new Error('Category not found');
    }
    return updateCategory;
  }

  @Delete(':id')  
  async deleteCategory(@Param('id') id: string): Promise<Category> {
    const categoryDelete = await this.categoryService.deleteCategory(id);
    return categoryDelete;
  }
}