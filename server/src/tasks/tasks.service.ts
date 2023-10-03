import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { TaskEntity } from './entities/task.entity';

@Injectable()
export class TasksService {

  constructor(private readonly prisma: PrismaService) {
  }

  create(createTaskDto: CreateTaskDto, authorId?: number) {
    createTaskDto.authorId = authorId;
    return this.prisma.task.create({ data: createTaskDto});
  }

  async findAll(): Promise<TaskEntity[]> {
    const tasks = await this.prisma.task.findMany();
    return tasks.map(t => new TaskEntity(t));
  }

  async findAllByUser(userId: number, completedFlag?: boolean): Promise<TaskEntity[]> {
    const tasks = await this.prisma.task.findMany({
      where: {
        authorId: userId,
        completed: completedFlag,
      },
    });
    return tasks.map(t => new TaskEntity(t));
  }

  findOne(id: number) {
    return this.prisma.task.findUnique({ where: { id } });
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return this.prisma.task.update({ where: { id }, data: updateTaskDto });
  }

  remove(id: number) {
    return this.prisma.task.delete({ where: { id } });
  }
}
