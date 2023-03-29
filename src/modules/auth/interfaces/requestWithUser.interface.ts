import { Request } from 'express';
import { UsersEntity } from '../../users/users.entity';

export interface RequestWithUser extends Request {
  user: UsersEntity;
}
