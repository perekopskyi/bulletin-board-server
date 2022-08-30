import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'test', description: 'Unique username' })
  @IsNotEmpty({ message: 'The username cannot be empty' })
  @IsString({ message: 'The username must be a string' })
  username!: string;

  @IsString({ message: 'The user email must be a string' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'P123*', description: 'Password user' })
  @IsNotEmpty({ message: 'The user password cannot be empty' })
  @IsString({ message: 'The user password must be a string' })
  password!: string;
}

export class UserDto {
  @IsNotEmpty() id: string;
  @IsNotEmpty() username: string;
  @IsNotEmpty() @IsEmail() email: string;
}

export class LoginUserDto {
  @IsNotEmpty() readonly username: string;
  @IsNotEmpty() readonly password: string;
}

// export class UserDto extends BaseDto {
//   @ApiProperty({ example: 'test', description: 'Unique username' })
//   @IsNotEmpty({ message: 'The username cannot be empty' })
//   @IsString({ message: 'The username must be a string' })
//   username!: string;

//   @IsString({ message: 'The user email must be a string' })
//   @IsNotEmpty()
//   @IsEmail()
//   email?: string;

//   @IsString({ message: 'The user first name must be a string' })
//   firstName?: string;

//   @IsString({ message: 'The user last name must be a string' })
//   lastName?: string;

//   @ApiProperty({ example: 'P123*', description: 'Password user' })
//   @IsNotEmpty({ message: 'The user password cannot be empty' })
//   @IsString({ message: 'The user password must be a string' })
//   password!: string;
// }
