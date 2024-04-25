import { Controller, Get, Post, Body, Param, HttpException, HttpStatus, HttpCode, Put, Patch, Delete } from '@nestjs/common';
import { Restaurant } from './entities/restaurant.entity';
import { RestaurantService } from './restaurant.service';
import { ApiResponse } from 'src/api_response/api-response.dto';

@Controller('/api/v1/restaurant')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  async createRestaurant(@Body() body: any): Promise<ApiResponse<any>> { 
    const { fantasyName, email, password, phone } = body;
    return await this.restaurantService.createRestaurant(fantasyName, email, password, phone); 
  }
  @Get()
  async getAllRestaurants(): Promise<ApiResponse<any>> {
    return await this.restaurantService.getAllRestaurants();
  }

  @Get(':id')
  async getRestaurantById(@Param('id') id: string): Promise<ApiResponse<any>> {
    return await this.restaurantService.getRestaurantById(String(id));
  }

  @Get(':id/status')
  async getRestaurantStatus(@Param('id') id: string): Promise<ApiResponse<any>> {
    return await this.restaurantService.getStatus(String(id));
  }

  @Put(':id/updateStatus')
  async updateRestaurantStatus(@Param('id') id: string, @Body() body: any): Promise<ApiResponse<any>> {
    const { status } = body;
    return await this.restaurantService.updateStatus(String(id), status);
  }
}