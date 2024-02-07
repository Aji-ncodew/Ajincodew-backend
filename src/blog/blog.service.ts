// blog.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { Blog } from './blog.model';
import { FirebaseRepository } from 'src/FirebaseRepository';

@Injectable()
export class BlogService {
  private collection: FirebaseFirestore.CollectionReference;

  constructor(private firebaseRepository: FirebaseRepository) {
    this.collection = this.firebaseRepository.getCollection('blogs');
  }

  async addblog(blog: Blog): Promise<Blog> {
    const docRef = await this.collection.add(blog);
    blog._id = docRef.id;
    return blog;
  }

  async getblogs(): Promise<Blog[]> {
    const snapshot = await this.collection.get();
    return snapshot.docs.map((doc) => ({ _id: doc.id, ...doc.data() } as Blog));
  }

  async getblogById(blogId: string): Promise<Blog> {
    const doc = await this.collection.doc(blogId).get();
    if (!doc.exists) {
      throw new NotFoundException(`blog with ID ${blogId} not found.`);
    }
    return { _id: doc.id, ...doc.data() } as Blog;
  }

  async deleteblog(blogId: string): Promise<string> {
    const doc = await this.collection.doc(blogId).get();
    if (!doc.exists) {
      throw new NotFoundException(`blog with ID ${blogId} not found.`);
    }

    await this.collection.doc(blogId).delete();
    return `blog with ID ${blogId} deleted successfully.`;
  }

  async updateblog(blog: Blog): Promise<Blog | { Error: string }> {
    const doc = await this.collection.doc(blog._id).get();
    if (!doc.exists) {
      return { Error: `blog with ID ${blog._id} not found.` };
    }

    await this.collection.doc(blog._id).update({
      updateDate: blog.updateDate,
      author: blog.author,
      publishDate: blog.publishDate,
      description: blog.description,
      title: blog.title
    });

    return blog;
  }
}
