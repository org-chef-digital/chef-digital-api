import { Injectable, UnauthorizedException } from '@nestjs/common';
import { RestaurantService } from '../restaurants/restaurant.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config'; 

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
  ): Promise<{ access_token: string }> {
    const restaurant = await this.restaurantService.getRestaurantByEmail(email);
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

    const payload = { sub: restaurant.id, email: restaurant.email };
    return {
      access_token: await this.jwtService.signAsync(payload, { secret: this.configService.get<string>('JWT_SECRET') }),
    };
  }
}
