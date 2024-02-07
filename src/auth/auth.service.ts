import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/user.model';
import { UsersService } from 'src/user/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<User> {
    const user = await this.usersService.getUserByUsername(username);
    if (user && user.password === password) {
      return user;
    }
    return null;
  }

  async login(user: User) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signUp(user: User) {
    // Assign admin role to the user
    user.roles = ['admin'];

    return this.usersService.addUser(user);
  }
}
