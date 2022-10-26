import { Request } from 'express';
import { UsersEntity } from '../../../database/entities/users.entity';

export interface RequestWithUser extends Request {
  user: UsersEntity;
}
