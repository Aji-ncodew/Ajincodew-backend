import { NestFactory } from '@nestjs/core';
import { BlogModule } from './blog/blog.module';
import { AppModule } from './app.module';
require('dotenv').config();

async function bootstrap() {
  const app = await NestFactory.create(BlogModule);
  const port = 3088; 
  console.log("Server running on : "+process.env.PORT)
  await app.listen(port);
}

bootstrap();
