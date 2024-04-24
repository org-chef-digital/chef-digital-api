import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signIn(@Body() signInData: { email: string, password: string }) { 
    const { email, password } = signInData;
    return this.authService.signIn(email, password);
  }

  @UseGuards(AuthGuard)
  @Get('profile') 
  getProfile(@Request() req) {
    return req.restaurant;
  }
}
