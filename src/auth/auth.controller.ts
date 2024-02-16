import { Controller, Request, Post, UseGuards, Get, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { Roles } from './roles.decorator';
import { User } from '../user/user.model';
import { RolesGuard } from './roles.guard';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
 
  @Post('login')
  async login(@Body('username') username: string, @Body('password') password: string) {
    return this.authService.login(username, password);
  }

  @Post('/signup/admin')
  async signUpAmin(@Body() user: User) {
    return this.authService.createAdmin(user);
  }

  @Post('/signup/office')
  async signUpOfficeMember(@Body() user: User) {
    return this.authService.createOfficeMember(user);
  }

  @Post('/signup/abonne')
  async signUpAbonne(@Body() user: User) {
    return this.authService.createAbonne(user);
  }

  // This endpoint is juste for test
  // @UseGuards(AuthGuard)
  @Roles('admin')
  @Get('data')
  async getData(){
    return ['data'];
  }
}
