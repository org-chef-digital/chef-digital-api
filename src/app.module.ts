import { Module } from '@nestjs/common';
import { RestaurantModule } from './restaurants/restaurant.module';
import { CategoryModule } from './categories/category.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    CategoryModule,
    RestaurantModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule], 
      useFactory: async (configService: ConfigService) => ({ 
        uri: configService.get<string>('MONGO_URI'), 
      }),
      inject: [ConfigService], 
    }),
  ],
})
export class AppModule {}
