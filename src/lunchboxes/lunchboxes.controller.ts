import { Controller, Get, Post, Body, HttpStatus, Param, Delete, HttpCode } from '@nestjs/common';
import { LunchboxesService } from './lunchboxes.service';
import { ApiResponse } from 'src/api_response/api-response.dto';
import { Lunchbox } from './entities/lunchbox.entity';
import { CreateLunchboxDto } from './dto/create-lunchbox.dto'; 

@Controller('api/v1/lunchboxes')
export class LunchboxesController {
  constructor(private readonly lunchboxesService: LunchboxesService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('/new')
  async createLunchbox(@Body() createLunchboxDto: CreateLunchboxDto): Promise<ApiResponse<Lunchbox>> {
    const { type, size, price, productsIds } = createLunchboxDto;
    return await this.lunchboxesService.createLunchbox(type, size, price, productsIds);
  }

  @Get('/all')
  async getAllLunchboxes(): Promise<ApiResponse<Lunchbox[]>> {
    return await this.lunchboxesService.getAllLunchboxes();
  }

  @Get(':id')
  async getLunchboxById(@Param('id') id: string): Promise<ApiResponse<Lunchbox>> {
    return await this.lunchboxesService.getLunchboxById(id);
  }

  @Delete(':id')
  async deleteLunchbox(@Param('id') id: string): Promise<ApiResponse<Lunchbox>> {
    return await this.lunchboxesService.deleteLunchbox(id);
  }
}
