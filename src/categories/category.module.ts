import { Module } from "@nestjs/common";
import { CategoryController } from "./category.controller";
import { CategoryService } from "./category.service";
import { MongooseModule } from "@nestjs/mongoose";
import { CategorySchema } from "./entities/category.entity";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Category', schema: CategorySchema }]), JwtModule],
  controllers: [CategoryController],
  providers: [CategoryService],
  exports: [CategoryService],
})
export class CategoryModule {}