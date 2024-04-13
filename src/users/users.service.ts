import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  private users: User[] = [];

  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  getUserByUsername(fantasyName: string): User {
    return this.users.find((user) => user.fantasyName === fantasyName);
  }

  async createUser(
    fantasyName: string,
    email: string,
    password: string,
    phone: string,
  ): Promise<User> {
    const newUser = new this.userModel({
      fantasyName: fantasyName,
      email: email,
      password: password,
      phone: phone,
    });

    if (this.getUserByUsername(newUser.fantasyName)) {
      throw new Error('Usuário já cadastrado');
    }
    const result = await newUser.save();
    return result.id;
  }

  async getUserById(id: string): Promise<User> {
    const user = await this.userModel.findById(id);
    return {
      id: user.id,
      fantasyName: user.fantasyName,
      email: user.email,
      password: user.password,
      phone: user.phone,
    };
  }

  async getAllUsers(): Promise<User[]> {
    const users = await this.userModel.find().exec();
    return users.map((use) => ({
      id: use.id,
      fantasyName: use.fantasyName,
      email: use.email,
      password: use.password,
      phone: use.phone,
    }));
  }

  async loginUser(fantasyName: string, password: string): Promise<User | null> {
    const user = await this.userModel.findOne({ fantasyName, password }).exec();
    if (!user) {
      throw new Error('Credenciais inválidas.');
    }
    return {
      id: user.id,
      fantasyName: user.fantasyName,
      email: user.email,
      password: user.password,
      phone: user.phone,
    };
  }
}
