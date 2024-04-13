import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  fantasyName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
});

export interface User {
  id: number;
  fantasyName: string;
  email: string;
  password: string;
  phone: string;

  // constructor(
  //   id: number,
  //   fantasyName: string,
  //   email: string,
  //   password: string,
  //   phone: string,
  // ) {
  //   this.id = id;
  //   this.fantasyName = fantasyName;
  //   this.email = email;
  //   this.password = password;
  //   this.phone = phone;
  // }
}
