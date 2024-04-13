import { Module } from '@nestjs/common';
import { UserModule } from './users/users.module';

import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    UserModule,
    MongooseModule.forRoot(
      'mongodb+srv://ChefDigitalDB:ft6osUYtKSiE3vUY@chefdigitalcluster.tauugvf.mongodb.net/?retryWrites=true&w=majority&appName=ChefDigitalCluster1',
    ),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
