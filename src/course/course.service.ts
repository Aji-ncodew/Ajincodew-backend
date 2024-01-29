// course.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { Course } from './course.model';  // Import the Course model
import { FirebaseRepository } from 'src/FirebaseRepository';

@Injectable()
export class CourseService {
  private collection: FirebaseFirestore.CollectionReference;

  constructor(private firebaseRepository: FirebaseRepository) {
    this.collection = this.firebaseRepository.getCollection('courses'); // Replace 'courses' with your desired collection name
  }

  async addCourse(course: Course): Promise<Course> {
    const docRef = await this.collection.add({
      _id: course._id,
      image: course.image,
      type: course.type,
      title: course.title,
      speakers: course.speakers,
      year: course.year,
      duration: course.duration,
      link: course.link,
    });

    course._id = docRef.id;
    return course;
  }

  async getCourses(): Promise<Course[]> {
    const snapshot = await this.collection.get();
    return snapshot.docs.map((doc) => ({
      _id: doc.id,
      ...doc.data(),
    } as Course));
  }

  async getCourseById(courseId: string): Promise<Course> {
    const doc = await this.collection.doc(courseId).get();
    if (!doc.exists) {
      throw new NotFoundException(`Course with ID ${courseId} not found.`);
    }

    return { _id: doc.id, ...doc.data() } as Course;
  }

  async deleteCourse(courseId: string): Promise<string> {
    const doc = await this.collection.doc(courseId).get();
    if (!doc.exists) {
      throw new NotFoundException(`Course with ID ${courseId} not found.`);
    }

    await this.collection.doc(courseId).delete();
    return `Course with ID ${courseId} deleted successfully.`;
  }

  async updateCourse(course: Course): Promise<Course | { Error: string }> {
    const doc = await this.collection.doc(course._id).get();
    if (!doc.exists) {
      return { Error: `Course with ID ${course._id} not found.` };
    }

    await this.collection.doc(course._id).update({
      image: course.image,
      type: course.type,
      title: course.title,
      speakers: course.speakers,
      year: course.year,
      duration: course.duration,
      link: course.link,
    });

    return course;
  }
}
