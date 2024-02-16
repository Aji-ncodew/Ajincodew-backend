import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/user.model';
import { UsersService } from 'src/user/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
    
  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.usersService.getUserByEmail(email);
    if (user && await bcrypt.compare(password, user.password)) {
      return user;
    }
    return null;
  }
  
  async login(username: string, password: string) {
    const user = await this.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload, { secret: 'zezr8f54zef8zeaepoijfirjzfef7877z89ref456zerf8ez54rf89e4fze5f4' }),
    };
  }

  async createAdmin(user: User) {
    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;

    // Assign admin role to the user
    user.roles = ['admin'];

    return this.usersService.addUser(user);
  }

  async createOfficeMember(user: User) {
    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;

    // Assign admin role to the user
    user.roles = ['office'];

    return this.usersService.addUser(user);
  }

  async createAbonne(user: User) {
    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;

    // Assign admin role to the user
    user.roles = ['abonne'];

    return this.usersService.addUser(user);
  }
}
