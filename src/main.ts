import { NestFactory } from '@nestjs/core';
import { BlogModule } from './blog/blog.module';
import { AppModule } from './app.module';
require('dotenv').config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3001; 
  console.log("Server running on : "+process.env.PORT)
  await app.listen(port);
}

bootstrap();
