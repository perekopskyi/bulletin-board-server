import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { BaseDto } from './base.dto';

export class UserDto extends BaseDto {
  @ApiProperty({ example: 'test', description: 'Unique username' })
  @IsNotEmpty({ message: 'The username cannot be empty' })
  @IsString({ message: 'The username must be a string' })
  username!: string;

  @IsString({ message: 'The user email must be a string' })
  email?: string;

  @IsString({ message: 'The user first name must be a string' })
  firstName?: string;

  @IsString({ message: 'The user last name must be a string' })
  lastName?: string;

  @ApiProperty({ example: 'P123*', description: 'Password user' })
  @IsNotEmpty({ message: 'The user password cannot be empty' })
  @IsString({ message: 'The user password must be a string' })
  password!: string;
}
