import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { ImageBucketService } from 'src/image-bucket/image-bucket.service';

@Module({
  imports: [TypeOrmModule.forFeature([Task]), NestjsFormDataModule],
  controllers: [TaskController],
  providers: [TaskService, ImageBucketService],
})
export class TaskModule {}
