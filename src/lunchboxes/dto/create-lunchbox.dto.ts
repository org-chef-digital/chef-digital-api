import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateLunchboxDto {
  @IsString()
  type: string;

  @IsNumber()
  size: number;

  @IsNumber()
  price: number;

  @IsArray()
  @IsOptional()
  productsIds?: string[];

}
