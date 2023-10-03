import { Task } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from 'src/users/entity/user.entity';

export class TaskEntity implements Task {
  constructor({author, ...data}: Partial<TaskEntity>) {
        Object.assign(this, data);
        if (author) {
            this.author = new UserEntity(author);
        }
  }
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty({ required: false, nullable: true })
  content: string | null;

  @ApiProperty()
  completed: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty({ required: false, nullable: true })
  authorId: number | null;

  @ApiProperty({ required: false, nullable: true })
  author?: UserEntity;
}