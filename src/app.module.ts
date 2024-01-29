import { Module } from '@nestjs/common';
import { FirebaseModule } from 'src/firebase.module';
import { BlogModule } from './blog/blog.module';
import { CourseModule } from './course/course.module';


@Module({
  imports: [FirebaseModule,CourseModule,BlogModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
