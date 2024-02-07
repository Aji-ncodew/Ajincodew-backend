import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.model';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async addUser(@Body() user: User): Promise<any> {
    await this.usersService.addUser(user);
  }

  @Get('all')
  async getUsers(): Promise<User[]> {
    return this.usersService.getUsers();
  }

  @Get(':userId')
  async getUserById(@Param('userId') userId: string): Promise<any> {
    return this.usersService.getUserById(userId);
  }

  @Get('username/:username')
  async getUserByUsername(@Param('username') username: string): Promise<any> {
    return this.usersService.getUserByUsername(username);
  }
}
