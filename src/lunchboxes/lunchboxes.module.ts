import { Module } from '@nestjs/common';
import { LunchboxesService } from './lunchboxes.service';
import { LunchboxesController } from './lunchboxes.controller';
import { LunchboxSchema } from './entities/lunchbox.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Lunchbox', schema: LunchboxSchema }])],
  controllers: [LunchboxesController],
  providers: [LunchboxesService],
})
export class LunchboxesModule {}
