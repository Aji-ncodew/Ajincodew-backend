import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
require('dotenv').config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = 3088; 
  console.log("Server running on : "+process.env.PORT)
  await app.listen(port);
}

bootstrap();
