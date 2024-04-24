import { PartialType } from '@nestjs/mapped-types';
import { CreateRestaurantDto } from './create-restaurant.dto';

export class UpdateUserDto extends PartialType(CreateRestaurantDto) {}
