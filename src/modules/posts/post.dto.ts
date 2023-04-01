import { IsNotEmpty } from 'class-validator';
import { BaseDto } from '../../database/base.dto';
import { DetailedUserDto } from '../users/user.dto';

export class CreatePostDto {
  @IsNotEmpty() title: string;
  @IsNotEmpty() text: string;
  // @IsNotEmpty() expiredAt?: Date;
  image?: string;
  // TODO categoryId
}
export class PostDto extends BaseDto {
  @IsNotEmpty() id: string;
  @IsNotEmpty() title: string;
  @IsNotEmpty() text: string;
  // @IsNotEmpty() expiredAt?: Date;
  @IsNotEmpty() authorId: string;
  image: string;
  // TODO categoryId
  // TODO viewed
}

export class UpdatePostDto extends BaseDto {
  @IsNotEmpty() title: string;
  @IsNotEmpty() text: string;
}

export class DetailedPostDto extends BaseDto {
  author: DetailedUserDto;
  image: string;
  isActive: boolean;
  isArchived: boolean;
  text: string;
  title: string;
  views: number;
}
