import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from './entities/task.entity';
import { QueryFailedError } from 'typeorm';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  async create(@Body() task: Task): Promise<Task> {
    return await this.taskService.create(task).catch((err) => {
      if (err instanceof QueryFailedError) {
        throw new HttpException(
          {
            message: `${err.name}: ${err.message}`,
          },
          HttpStatus.BAD_REQUEST,
        );
      }

      throw err;
    });
  }

  @Get()
  findAll() {
    return this.taskService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taskService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() task) {
    return this.taskService.update(+id, task);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskService.remove(+id);
  }
}
