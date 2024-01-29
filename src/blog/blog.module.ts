import { Module } from '@nestjs/common';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';
import { FirebaseModule } from 'src/firebase.module';


@Module({
  imports: [FirebaseModule],
  controllers: [BlogController],
  providers: [BlogService],
})
export class BlogModule {}
