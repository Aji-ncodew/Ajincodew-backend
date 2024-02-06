import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { UsersModule } from 'src/user/users.module';
import { LocalStrategy } from './local.strategy'; 

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'YOUR_SECRET_KEY',
      signOptions: { expiresIn: '1h' }, 
    }),
    UsersModule,
  ],
  providers: [AuthService, JwtStrategy, LocalStrategy], 
  controllers: [AuthController],
})
export class AuthModule {}
