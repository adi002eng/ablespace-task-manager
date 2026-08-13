import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(
    private readonly tasksService: TasksService,
  ) {}

  // GET /tasks
  @Get()
  findAll() {
    return this.tasksService.findAll();
  }

  // GET /tasks/:id
  @Get(':id')
  findOne(
    @Param('id') id: string,
  ) {
    return this.tasksService.findOne(id);
  }

  // POST /tasks
  @Post()
  create(
    @Body() dto: CreateTaskDto,
  ) {
    return this.tasksService.create(dto);
  }

  // PATCH /tasks/:id
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateTaskDto,
  ) {
    console.log(
      'PATCH TASK:',
      id,
      dto,
    );

    return this.tasksService.update(
      id,
      dto,
    );
  }

  // DELETE /tasks/:id
  @Delete(':id')
  remove(
    @Param('id') id: string,
  ) {
    return this.tasksService.remove(id);
  }
}