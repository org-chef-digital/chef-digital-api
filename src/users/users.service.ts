import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  private users: User[] = [];

  getUserByUsername(fantasyName: string): User {
    return this.users.find((user) => user.fantasyName === fantasyName);
  }

  async createUser(user: User): Promise<User> {
    const hashedPassword = this.hashPassword(user.password);
    const newUser = new User(
      this.generateUniqueId(),
      user.fantasyName,
      user.email,
      await hashedPassword,
      user.phone,
    );

    if (this.getUserByUsername(newUser.fantasyName)) {
      throw new Error('Usuário já cadastrado');
    }
    const someFieldIsEmpty = Object.values(newUser).some((value) => !value);
    if (someFieldIsEmpty) {
      throw new Error('Campos obrigatórios não preenchidos');
    }
    this.users.push(newUser);
    return newUser;
  }
  generateUniqueId(): number {
    return this.users.length + 1;
  }

  getUserById(id: number): User {
    return this.users.find((user) => user.id === id);
  }

  getAllUsers(): User[] {
    return this.users;
  }

  async loginUser(fantasyName: string, password: string): Promise<User | null> {
    const user = this.getUserByUsername(fantasyName);

    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new Error('Credenciais inválidas');
    }

    return user;
  }

  hashPassword(password: string): Promise<string> {
    const salt = 10;
    return bcrypt.hash(password, salt);
  }
}
