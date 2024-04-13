import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { User } from './entities/user.entity';
import { UserService } from './users.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async createUser(@Body() body: any): Promise<User> {
    const { fantasyName, email, password, phone } = body;
    return this.userService.createUser(fantasyName, email, password, phone);
  }

  @Get()
  async getAllUsers(): Promise<User[]> {
    const products = await this.userService.getAllUsers();
    return products;
  }

  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<User> {
    return this.userService.getUserById(String(id));
  }

  @Post('login')
  async loginUser(
    @Body() loginCredentials: { fantasyName: string; password: string },
  ): Promise<User | string> {
    const { fantasyName, password } = loginCredentials;
    try {
      const user = await this.userService.loginUser(fantasyName, password);
      if (!user) {
        throw new HttpException(
          'Usuário não encontrado!',
          HttpStatus.NOT_FOUND,
        );
      }
      return user;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
    }
  }
}
