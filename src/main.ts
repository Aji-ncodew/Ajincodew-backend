import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
require('dotenv').config();

async function bootstrap() {
  const server = express();
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(server),
  );

  // Enable CORS
  app.enableCors();

  const port = process.env.PORT || 1000; 
  console.log("Server running on : " + port);
  
  await app.listen(port);
}

bootstrap();
