// course.controller.ts
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CourseService } from './course.service';
import { Course } from './course.model';

@Controller('courses')
export class courseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  async addCourse(
    @Body() newcourse: Course,
  ): Promise<Course> {
    return this.courseService.addCourse(newcourse);
  }

  @Get()
  async getCourses(): Promise<Course[]> {
    return this.courseService.getCourses();
  }

  @Get(':id')
  async getCourseById(
    @Param('id') prodId: string,
  ): Promise<Course> {
    return this.courseService.getCourseById(prodId);
  }

  @Delete(':id')
  async deleteCourse(
    @Param('id') prodId: string,
  ): Promise<string> {
    return this.courseService.deleteCourse(prodId);
  }

  @Patch()
  async updateCourse(
    @Body() updatedcourse: Course,
  ): Promise<Course | { Error: string }> {
    return this.courseService.updateCourse(updatedcourse);
  }
}
