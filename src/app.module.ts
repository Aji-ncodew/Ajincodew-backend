import { Module } from '@nestjs/common';
import { FirebaseModule } from 'src/firebase.module';
import { BlogModule } from './blog/blog.module';
import { CourseModule } from './course/course.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './user/users.module';


@Module({
  imports: [FirebaseModule,CourseModule,BlogModule,AuthModule,UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
