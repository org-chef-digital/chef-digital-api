import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RestaurantModule } from '../restaurants/restaurant.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config'; 
import { AuthController } from './auth.controller';

@Module({
  imports: [
    RestaurantModule,
    JwtModule.registerAsync({ 
      imports: [ConfigModule], 
      inject: [ConfigService], 
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '2d' },
      }),
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
