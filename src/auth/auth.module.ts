import { Module } from '@nestjs/common';
import { UsersModule } from '../user/users.module';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy'; 
import { AuthController } from './auth.controller';
import { UsersService } from '../user/users.service'; 
import { JwtService } from '@nestjs/jwt'; 
import { FirebaseModule } from '../Firebase.module';
require('dotenv').config();

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'zezr8f54zef8zeaepoijfirjzfef7877z89ref456zerf8ez54rf89e4fze5f4',
      signOptions: { expiresIn: '1d' }, 
    }),
    UsersModule,
    FirebaseModule, 
  ],
  providers: [AuthService, LocalStrategy, UsersService, JwtService], 
  controllers: [AuthController],
})
export class AuthModule {}