import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from './entities/task.entity';
import { FormDataRequest } from 'nestjs-form-data';
import { ImageBucketService } from 'src/image-bucket/image-bucket.service';

@Controller('tasks')
export class TaskController {
  constructor(
    private readonly taskService: TaskService,
    private readonly imageBuckerService: ImageBucketService,
  ) {}

  @Post()
  @FormDataRequest()
  async create(@Body() task: Task): Promise<Task> {
    await this.imageBuckerService.uploadImage(task.image, task.title);
    task.imageUrl =
      process.env.BUCKET_DOMAIN + task.title + '.' + task.image.extension;

    delete task.image;
    return await this.taskService.create(task);
  }

  @Get()
  findAll() {
    return this.taskService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.taskService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() task) {
    return this.taskService.update(id, task);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.taskService.remove(id);
  }
}
