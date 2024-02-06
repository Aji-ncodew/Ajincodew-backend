import { Injectable } from '@nestjs/common';
import { User } from './user.model';

@Injectable()
export class UsersService {
  private users: User[] = [];

  createUser(user: User): User {
    const newUser = { id: this.users.length + 1, ...user };
    this.users.push(newUser);
    return newUser;
  }

  findOne(username: string): User | undefined {
    return this.users.find(user => user.username === username);
  }

  findById(id: number): User | undefined {
    return this.users.find(user => user.id === id);
  }
}
