import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  fantasyName: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  numberPhone: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
