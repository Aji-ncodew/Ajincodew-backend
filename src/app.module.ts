import { Module } from '@nestjs/common';
import { FirebaseModule } from './firebase.module'; // Adjust the path as necessary
import { ConfigModule } from '@nestjs/config';
import { BlogModule } from './blog/blog.module';
import { UsersModule } from './user/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ConfigModule, FirebaseModule, UsersModule, BlogModule, AuthModule], 
  controllers: [],
  providers: [],
})
export class AppModule {}
