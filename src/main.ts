import { NestFactory } from '@nestjs/core';
import { BlogModule } from './blog/blog.module';
require('dotenv').config();

async function bootstrap() {
  const app = await NestFactory.create(BlogModule);
  const port = process.env.PORT || 3000; 
  console.log("Server running on : "+process.env.PORT)
  await app.listen(port);
}

bootstrap();
