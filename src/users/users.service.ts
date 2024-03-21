import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  private users: User[] = [];

  getUserByUsername(fantasyName: string): User {
    return this.users.find((user) => user.fantasyName === fantasyName);
  }

  createUser(user: User): User {
    user.id = this.generateUniqueId();
    this.users.push(user);
    return user;
  }

  getUserById(id: number): User {
    return this.users.find((user) => user.id === id);
  }

  getAllUsers(): User[] {
    return this.users;
  }

  updateUser(id: number, updateUserDto: Partial<User>): User {
    const user = this.getUserById(id);
    if (!user) {
      throw new Error('Usuário não encontrado');
    }
    Object.assign(user, updateUserDto);
    return user;
  }

  deleteUser(id: number): void {
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) {
      throw new Error('Usuário não encontrado');
    }
    this.users.splice(index, 1);
  }

  private generateUniqueId(): number {
    return this.users.length > 0
      ? Math.max(...this.users.map((user) => user.id)) + 1
      : 1;
  }
}
