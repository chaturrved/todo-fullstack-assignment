import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards, Req } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { TaskEntity } from './entities/task.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Role } from '../auth/roles/role.enum';
import { RoleGuard } from '../auth/roles/role.guard';
import { RequestWithUser } from 'src/users/requestWithUser.interface';
import { UserEntity } from 'src/users/entity/user.entity';


@Controller('tasks')
@ApiTags('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post('addTask')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: TaskEntity})
  async create(@Body() createTaskDto: CreateTaskDto, @Req() request: RequestWithUser) {
    const user = new UserEntity(request.user);
    const authorId = user.id;
    return new TaskEntity(await this.tasksService.create(createTaskDto, authorId));
  }

  
  @Get('allTasks')
  @UseGuards(JwtAuthGuard, RoleGuard(Role.ADMIN))
  @ApiBearerAuth()
  @ApiOkResponse({ type: TaskEntity, isArray: true })
  async findEverything() {
    const tasks = await this.tasksService.findAll();
    return tasks.map(t => new TaskEntity(t));
  }

  @Get('myTasks')
  @UseGuards(JwtAuthGuard, RoleGuard(Role.USER))
  @ApiBearerAuth()
  @ApiOkResponse({ type: TaskEntity, isArray: true })
  async findAllByUser(@Req() request: RequestWithUser) {
    const user = new UserEntity(request.user);
    const tasks = await this.tasksService.findAllByUser(user.id);
    return tasks.map(t => new TaskEntity(t));
  }

  @Get('myCompletedTasks')
  @UseGuards(JwtAuthGuard, RoleGuard(Role.USER))
  @ApiBearerAuth()
  @ApiOkResponse({ type: TaskEntity, isArray: true })
  async findMyCompletedTasks(@Req() request: RequestWithUser) {
    const user = new UserEntity(request.user);
    const tasks = await this.tasksService.findAllByUser(user.id, true);
    return tasks.map(t => new TaskEntity(t));
  }
  

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: TaskEntity })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return new TaskEntity(await this.tasksService.findOne(id));
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: TaskEntity })
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateTaskDto: UpdateTaskDto) {
    return new TaskEntity(await this.tasksService.update(id, updateTaskDto));
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: TaskEntity })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return new TaskEntity(await this.tasksService.remove(id));
  }
}
