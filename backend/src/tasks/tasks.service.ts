import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  // GET /tasks
  async findAll() {
    return this.prisma.task.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  // GET /tasks/:id
  async findOne(id: string) {
    const task =
      await this.prisma.task.findUnique({
        where: {
          id,
        },
      });

    if (!task) {
      throw new NotFoundException(
        'Task not found',
      );
    }

    return task;
  }

  // POST /tasks
  async create(dto: CreateTaskDto) {
    return this.prisma.task.create({
      data: {
        title: dto.title.trim(),

        description:
          dto.description?.trim() || null,

        status:
          dto.status ?? 'TODO',

        assignee:
          dto.assignee?.trim() || null,

        dueDate: dto.dueDate
          ? new Date(dto.dueDate)
          : null,

        tag:
          dto.tag?.trim() || null,
      },
    });
  }

  // PATCH /tasks/:id
  async update(
    id: string,
    dto: UpdateTaskDto,
  ) {
    const existingTask =
      await this.prisma.task.findUnique({
        where: {
          id,
        },
      });

    if (!existingTask) {
      throw new NotFoundException(
        'Task not found',
      );
    }

    console.log(
      'UPDATE TASK:',
      id,
      dto,
    );

    const updatedTask =
      await this.prisma.task.update({
        where: {
          id,
        },

        data: {
          ...(dto.title !== undefined && {
            title: dto.title.trim(),
          }),

          ...(dto.description !==
            undefined && {
            description:
              dto.description?.trim() ||
              null,
          }),

          ...(dto.status !== undefined && {
            status: dto.status,
          }),

          ...(dto.assignee !== undefined && {
            assignee:
              dto.assignee?.trim() ||
              null,
          }),

          ...(dto.dueDate !== undefined && {
            dueDate: dto.dueDate
              ? new Date(dto.dueDate)
              : null,
          }),

          ...(dto.tag !== undefined && {
            tag:
              dto.tag?.trim() || null,
          }),
        },
      });

    console.log(
      'UPDATED TASK:',
      updatedTask,
    );

    return updatedTask;
  }

  // DELETE /tasks/:id
  async remove(id: string) {
    const existingTask =
      await this.prisma.task.findUnique({
        where: {
          id,
        },
      });

    if (!existingTask) {
      throw new NotFoundException(
        'Task not found',
      );
    }

    const deletedTask =
      await this.prisma.task.delete({
        where: {
          id,
        },
      });

    return deletedTask;
  }
}