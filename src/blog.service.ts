// blog.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { blog } from './blog.model';
import { FirebaseRepository } from 'src/FirebaseRepository';

@Injectable()
export class BlogService {
  private collection: FirebaseFirestore.CollectionReference;

  constructor(private firebaseRepository: FirebaseRepository) {
    this.collection = this.firebaseRepository.getCollection('blogs'); // Replace 'blogs' with your desired collection name
  }

  async addblog(blog: blog): Promise<blog> {
    const docRef = await this.collection.add(blog);
    blog.id = docRef.id;
    return blog;
  }

  async getblogs(): Promise<blog[]> {
    const snapshot = await this.collection.get();
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as blog));
  }

  async getblogById(blogId: string): Promise<blog> {
    const doc = await this.collection.doc(blogId).get();
    if (!doc.exists) {
      throw new NotFoundException(`blog with ID ${blogId} not found.`);
    }
    return { id: doc.id, ...doc.data() } as blog;
  }

  async deleteblog(blogId: string): Promise<string> {
    const doc = await this.collection.doc(blogId).get();
    if (!doc.exists) {
      throw new NotFoundException(`blog with ID ${blogId} not found.`);
    }

    await this.collection.doc(blogId).delete();
    return `blog with ID ${blogId} deleted successfully.`;
  }

  async updateblog(blog: blog): Promise<blog | { Error: string }> {
    const doc = await this.collection.doc(blog.id).get();
    if (!doc.exists) {
      return { Error: `blog with ID ${blog.id} not found.` };
    }

    await this.collection.doc(blog.id).update({
      updateDate: blog.updateDate,
      author: blog.author,
      publishDate: blog.publishDate,
      description: blog.description,
      title: blog.title
    });

    return blog;
  }
}
