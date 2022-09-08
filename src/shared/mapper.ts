import { DetailedPostDto, PostDto } from '../database/dto/post.dto';
import { DetailedUserDto, UserDto } from '../database/dto/user.dto';
import { PostsEntity } from '../database/entities/posts.entity';
import { UsersEntity } from '../database/entities/users.entity';

export const toUserDto = (user: UsersEntity): UserDto => {
  const { id, username, email } = user;
  const userDto: UserDto = { id, username, email };
  return userDto;
};
export const toDetailedUserDto = (user: UsersEntity): DetailedUserDto => {
  const { id, username, created, email, firstName, lastName, posts } = user;
  const detailedUserDto: DetailedUserDto = {
    id,
    username,
    created,
    email,
    firstName,
    lastName,
    posts,
  };
  return detailedUserDto;
};

export const toPostDto = (post: PostsEntity): PostDto => {
  const { id, title, text, created, updated, image, author } = post;
  const postDto: PostDto = {
    id,
    title,
    text,
    created,
    updated,
    image,
    authorId: author?.id,
  };
  return postDto;
};
export const toDetailedPostDto = (post: PostsEntity): DetailedPostDto => {
  const {
    id,
    title,
    text,
    created,
    updated,
    image,
    author,
    isActive,
    isArchived,
    views,
  } = post;

  const { username, email, firstName, lastName, posts } = author;
  const postDto: DetailedPostDto = {
    id,
    title,
    text,
    created,
    updated,
    image,
    author: {
      created: author.created,
      id: author.id,
      username,
      email,
      firstName,
      lastName,
      posts,
    },
    isActive,
    isArchived,
    views,
  };
  return postDto;
};
