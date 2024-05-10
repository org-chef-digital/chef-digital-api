import { Injectable } from '@nestjs/common';
import { Restaurant } from './entities/restaurant.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ApiResponse } from 'src/api_response/api-response.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class RestaurantService {
  constructor(@InjectModel('Restaurant') private readonly restaurantModel: Model<Restaurant>) {}

  async createRestaurant(
    fantasyName: string,
    email: string,
    password: string,
    phone: string,
  ): Promise<ApiResponse<Restaurant>> {
    try {
      const existingRestaurant = await this.restaurantModel.findOne({ fantasyName }).exec();
    if (existingRestaurant) {
      throw new Error('User already exists');
    }

    const regexMin8Chars = new RegExp('.{8,}');
    const regexUpperCase = new RegExp('.*[A-Z].*');
    const regexLowerCase = new RegExp('.*[a-z].*');

    if (!regexMin8Chars.test(password)) {
      throw new Error('Password must have at least 8 characters');
    }

    if (!regexUpperCase.test(password)) {
      throw new Error('Password must have at least one uppercase letter');
    }

    if (!regexLowerCase.test(password)) {
      throw new Error('Password must have at least one lowercase letter');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new this.restaurantModel({
      fantasyName,
      email,
      password: hashedPassword,
      phone,
      status: false,
    });

    const result = await newUser.save();

    return new ApiResponse(true, 'Restaurant created sucessfully', result.toObject() as Restaurant);
    } catch (error) {
    return new ApiResponse(false, error.message);
    }
  }

  async getRestaurantById(id: string): Promise<ApiResponse<Restaurant>> {
    try {
      const restaurant = await this.restaurantModel.findById(id).exec();
    if (!restaurant) {
      throw new Error('Restaurant not found');
    }

    return new ApiResponse(true, 'Restaurant found', restaurant.toObject() as Restaurant);
    } catch (error) {
    return new ApiResponse(false, error.message);
    }
  }

  async getAllRestaurants(): Promise<ApiResponse<Restaurant[]>> {
    try {
      const restaurants = await this.restaurantModel.find().exec();
      return new ApiResponse(true, 'Restaurants found', restaurants.map((restaurant) => restaurant.toObject() as Restaurant));
    } catch (error) {
      return new ApiResponse(false, error.message);
    }
  }

  async getRestaurantByEmail(email: string): Promise<{restaurant: Restaurant; id: string}> {
    const restaurant = await this.restaurantModel.findOne({ email }).exec();
    if (!restaurant) {
      throw new Error('Email not found');
    }

    const id = restaurant._id.toHexString();
    return {restaurant, id};

  }
  

  async validatePassword(password: string, restaurantPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, restaurantPassword);
  }

  async getStatus(id: string): Promise<ApiResponse<boolean>> {
    try {
      const restaurant = await this.restaurantModel.findById(id).exec();
      if (!restaurant) {
        throw new Error('Restaurant not found');
      }
      return new ApiResponse(true, 'Restaurant status found', restaurant.status);
    } catch (error) {
      return new ApiResponse(false, error.message);
    }
  }

  async updateStatus(id: string, status: boolean): Promise<ApiResponse<Restaurant>> {
    try {
      const restaurant = await this.restaurantModel.findById(id).exec();
      if (!restaurant) {
        throw new Error('Restaurant not found');
      }

      restaurant.status = status;
      console.log(restaurant.status);
  
      const updatedRestaurant = await restaurant.save();
  
      return new ApiResponse(true, 'Restaurant status updated', updatedRestaurant.toObject() as Restaurant);
    } catch (error) {
      return new ApiResponse(false, error.message);
    }
  }
  
}
