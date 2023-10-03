import { Request } from 'express';
import { UserEntity } from './entity/user.entity';

export interface RequestWithUser extends Request {
  user: UserEntity;
}