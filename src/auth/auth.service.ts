import { Injectable, UnauthorizedException } from '@nestjs/common';
import { RestaurantService } from '../restaurants/restaurant.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config'; 
import { ApiResponse } from 'src/api_response/api-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private restaurantService: RestaurantService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}
  async signIn(
    email: string,
    password: string,
  ): Promise<ApiResponse<any>> {
    try {
      const { restaurant, id } = await this.restaurantService.getRestaurantByEmail(email);

      if (!restaurant) {
        throw new UnauthorizedException('Restaurant not found');
      }

      const isPasswordValid = await this.restaurantService.validatePassword(
        password,
        restaurant.password,
      );

      if (!isPasswordValid) {
        throw new UnauthorizedException('Wrong password');
      }

      const responsePayload = {
        email: restaurant.email,
        id: id,
        access_token: this.jwtService.sign({ sub: id, email }),
      };

      console.log(responsePayload);
      
      return new ApiResponse(true, 'Login successful', responsePayload);
    } catch (error) {
      return new ApiResponse(false, error.message);
    }
  }
}
