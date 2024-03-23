import { Controller, Get, Post, Body, Param } from '@nestjs/common';

import { User } from './entities/user.entity';
import { UserService } from './users.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() createUserDto: User): Promise<User> {
    return await this.userService.createUser(createUserDto);
  }

  @Get()
  getAllUsers(): User[] {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  getUserById(@Param('id') id: string): User {
    return this.userService.getUserById(Number(id));
  }

  @Post('login')
  async loginUser(
    @Body() loginCredentials: { fantasyName: string; password: string },
  ): Promise<User | string> {
    const { fantasyName, password } = loginCredentials;
    try {
      const user = await this.userService.loginUser(fantasyName, password);
      return user;
    } catch (error) {
      return 'User not found';
    }
  }
}
