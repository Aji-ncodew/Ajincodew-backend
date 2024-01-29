// blog.controller.ts
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { BlogService } from './blog.service';
import { Blog } from './blog.model';

@Controller('blogs')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Post()
  async addBlog(
    @Body() newBlog: Blog,
  ): Promise<Blog> {
    return this.blogService.addblog(newBlog);
  }

  @Get()
  async getblogs(): Promise<Blog[]> {
    return this.blogService.getblogs();
  }

  @Get(':id')
  async getblogById(
    @Param('id') prodId: string,
  ): Promise<Blog> {
    return this.blogService.getblogById(prodId);
  }

  @Delete(':id')
  async deleteblog(
    @Param('id') prodId: string,
  ): Promise<string> {
    return this.blogService.deleteblog(prodId);
  }

  @Patch()
  async updateblog(
    @Body() updatedBlog: Blog,
  ): Promise<Blog | { Error: string }> {
    return this.blogService.updateblog(updatedBlog);
  }
}
