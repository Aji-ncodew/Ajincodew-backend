import { Module } from '@nestjs/common';
import { FirebaseModule } from 'src/firebase.module';
import { UsersController } from './user.controller';
import { UsersService } from './users.service';


@Module({
  imports: [FirebaseModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
