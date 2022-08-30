import { UserDto } from '../database/dto/user.dto';
import { UsersEntity } from '../database/entities/users.entity';

export const toUserDto = (data: UsersEntity): UserDto => {
  const { id, username, email } = data;
  const userDto: UserDto = { id, username, email };
  return userDto;
};
