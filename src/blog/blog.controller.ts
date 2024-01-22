// blog.controller.ts
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { BlogService } from './blog.service';
import { blog } from './blog.model';

@Controller('blogs')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Post()
  async addblog(
    @Body() newBlog: blog,
  ): Promise<blog> {
    return this.blogService.addblog(newBlog);
  }

  @Get()
  async getblogs(): Promise<blog[]> {
    return this.blogService.getblogs();
  }

  @Get(':id')
  async getblogById(
    @Param('id') prodId: string,
  ): Promise<blog> {
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
    @Body() updatedBlog: blog,
  ): Promise<blog | { Error: string }> {
    return this.blogService.updateblog(updatedBlog);
  }
}
