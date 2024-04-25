import { Controller, Get, Post, Body, Param, HttpException, HttpStatus, HttpCode, Put, Patch, Delete } from '@nestjs/common';
import { Restaurant } from './entities/restaurant.entity';
import { RestaurantService } from './restaurant.service';

@Controller('/api/v1/restaurant')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  async createRestaurant(@Body() body: any): Promise<Restaurant> {
    const { fantasyName, email, password, phone } = body;
    return this.restaurantService.createRestaurant(fantasyName, email, password, phone);
  }

  @Get()
  async getAllRestaurants(): Promise<Restaurant[]> {
    return this.restaurantService.getAllRestaurants();
  }

  @Get(':id')
  async getRestaurantById(@Param('id') id: string): Promise<Restaurant> {
    return this.restaurantService.getRestaurantById(String(id));
  }

  @Get(':id/status')
  async getRestaurantStatus(@Param('id') id: string): Promise<{ status: boolean }> {
    const restaurant = await this.restaurantService.getRestaurantById(String(id));
    return { 
      status: restaurant.status };
  }

  @Put(':id/updateStatus')
  async updateRestaurantStatus(@Param('id') id: string, @Body() body: any): Promise<{ status: boolean }> {
    const { status } = body;
    const restaurant = await this.restaurantService.updateStatus(String(id), status);
    return { status: restaurant.status };
  }
}