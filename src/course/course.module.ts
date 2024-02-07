import { Module } from '@nestjs/common';
import { courseController } from './course.controller';
import { CourseService } from './course.service';
import { FirebaseModule } from 'src/firebase.module';


@Module({
  imports: [FirebaseModule],
  controllers: [courseController],
  providers: [CourseService],
})
export class CourseModule {}
