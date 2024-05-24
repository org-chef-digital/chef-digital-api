import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from './entities/product.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }]), JwtModule],
    controllers: [ProductController],
    providers: [ProductService],
    exports: [ProductService]
})
export class ProductModule {}