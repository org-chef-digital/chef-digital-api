import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { ApiResponse } from 'src/api_response/api-response.dto';

@Controller('/api/v1/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signIn(@Body() signInData: { email: string, password: string }): Promise<ApiResponse<any>> { 
    const { email, password } = signInData;
    return this.authService.signIn(email, password);
  }

  @UseGuards(AuthGuard)
  @Get('profile') 
  getProfile(@Request() req): Promise<ApiResponse<any>> {
    return req.user
  }
}
