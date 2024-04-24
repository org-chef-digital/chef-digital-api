import { Injectable } from '@nestjs/common';
import { Restaurant } from './entities/restaurant.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class RestaurantService {
  constructor(@InjectModel('Restaurant') private readonly restaurantModel: Model<Restaurant>) {}

  async createRestaurant(
    fantasyName: string,
    email: string,
    password: string,
    phone: string,
  ): Promise<Restaurant> {
    const existingRestaurant = await this.restaurantModel.findOne({ fantasyName }).exec();
    if (existingRestaurant) {
      throw new Error('User already exists');
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
    return result.toObject() as Restaurant;
  }

  async getRestaurantById(id: string): Promise<Restaurant> {
    const restaurant = await this.restaurantModel.findById(id).exec();
    if (!restaurant) {
      throw new Error('Restaurant not found');
    }
    return {
      id: restaurant.id,
      fantasyName: restaurant.fantasyName,
      email: restaurant.email,
      password: restaurant.password,
      phone: restaurant.phone,
      status: restaurant.status,
    };
  }

  async getAllRestaurants(): Promise<Restaurant[]> {
    const restaurants = await this.restaurantModel.find().exec();
    return restaurants.map((restaurant) => ({
      id: restaurant.id,
      fantasyName: restaurant.fantasyName,
      email: restaurant.email,
      password: restaurant.password,
      phone: restaurant.phone,
      status: restaurant.status,
    }));
  }

  async getRestaurantByEmail(email: string): Promise<Restaurant> {
    const restaurant = await this.restaurantModel.findOne({ email }).exec();
    if (!restaurant) {
      throw new Error('Email not found');
    }
    return restaurant.toObject() as Restaurant;
  }
  

  async validatePassword(password: string, restaurantPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, restaurantPassword);
  }

  async getStatus(id: string): Promise<boolean> {
    const restaurant = await this.restaurantModel.findById(id).exec();
    if (!restaurant) {
      throw new Error('Restaurant not found');
    }
    return restaurant.status;
  }

  async updateStatus(id: String, status: Boolean): Promise<Restaurant> {
    const restaurant = await this.restaurantModel.findById(id).exec();
    if (!restaurant) {
      throw new Error('Restaurant not found');
    }

    restaurant.status = true;
    await restaurant.save();

    return {
      id: restaurant.id,
      fantasyName: restaurant.fantasyName,
      email: restaurant.email,
      password: restaurant.password,
      phone: restaurant.phone,
      status: restaurant.status,
    };
  }
}
