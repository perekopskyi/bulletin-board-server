import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PostsEntity } from '../posts/posts.entity';

export class CreateUserDto {
  @ApiProperty({ example: 'test', description: 'Unique username' })
  @IsNotEmpty({ message: 'The username cannot be empty' })
  @IsString({ message: 'The username must be a string' })
  username!: string;

  @IsString({ message: 'The user email must be a string' })
  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @ApiProperty({ example: 'P123*', description: 'Password user' })
  @IsNotEmpty({ message: 'The user password cannot be empty' })
  @IsString({ message: 'The user password must be a string' })
  password?: string;

  @IsString({ message: 'The user first name must be a string' })
  @IsOptional()
  firstName?: string;

  @IsString({ message: 'The user last name must be a string' })
  @IsOptional()
  lastName?: string;
}

// TODO Swagger
export class UpdateUserDto {
  id?: string;
  username: string;
  email: string;
  password?: string;
  firstName?: string;
  lastName?: string;
}

// TODO make Archive User logic
export class ArchiveUserDto {
  id?: string;
  isActive?: boolean;
  isArchived?: boolean;
}

export class UserDto {
  @ApiProperty({
    example: 'b58a258a-1a2f-11ed-861d-0242ac120002',
    description: 'UserId as UUID',
  })
  @IsNotEmpty()
  id: string;

  @ApiProperty({
    example: 'Max-T',
    description: 'Unique username of the user',
  })
  @IsNotEmpty()
  username: string;
  @IsNotEmpty() @IsEmail() email: string;
}

export class DetailedUserDto {
  id: string;
  username: string;
  created: Date;
  email: string;
  firstName: string;
  lastName: string;
  posts: Array<PostsEntity>;
}

export class LoginUserDto {
  @ApiProperty({ example: 'test', description: 'Unique username' })
  @IsNotEmpty({ message: 'The username cannot be empty' })
  @IsNotEmpty()
  readonly username!: string;

  @ApiProperty({ example: 'P123*', description: 'Password user' })
  @IsNotEmpty({ message: 'The user password cannot be empty' })
  @IsString({ message: 'The user password must be a string' })
  @IsNotEmpty()
  readonly password!: string;
}
