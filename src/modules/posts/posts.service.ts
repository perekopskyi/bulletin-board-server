import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto, PostDto } from '../../database/dto/post.dto';
import { UserDto } from '../../database/dto/user.dto';
import { PostsEntity } from '../../database/entities/posts.entity';
import { UsersEntity } from '../../database/entities/users.entity';
import { toDetailedPostDto, toPostDto } from '../../shared/mapper';
import { UsersService } from '../users/users.service';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostsEntity)
    private postsRepository: Repository<PostsEntity>,
    private readonly usersService: UsersService,
  ) {}

  async create({ username }: UserDto, postDto: CreatePostDto) {
    // get the user from db
    const author = await this.usersService.findByUsername(username);
    const createdPost: PostsEntity = this.postsRepository.create({
      ...postDto,
      author,
    });
    await this.postsRepository.save(createdPost);
    return toPostDto(createdPost);
  }

  async findAll(userId?: string) {
    if (userId) {
      const user: UsersEntity = await this.usersService.findOne(userId);
      if (!user) {
        return new NotFoundException(`User with id=${userId} was not found`);
      }

      const postsAndCount = await this.postsRepository.findAndCount({
        where: { authorId: user.id },
        relations: ['author'],
      });
      return {
        posts: postsAndCount[0].map((post) => toDetailedPostDto(post)),
        count: postsAndCount[1],
      };
    }
    const allPostsAndCount = await this.postsRepository.findAndCount({
      relations: {
        author: true,
      },
    });
    return {
      posts: allPostsAndCount[0].map((post) => toDetailedPostDto(post)),
      count: allPostsAndCount[1],
    };
  }

  async findOne(id: string) {
    const post = await this.postsRepository.findOne({
      where: { id },
      relations: {
        author: true,
      },
    });
    return toDetailedPostDto(post);
  }

  async remove(id: string): Promise<void> {
    const result = await this.postsRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Post with id = ${id} was not found`);
    }
  }
  async update(id: string, postDto: PostDto) {
    if (postDto.id) delete postDto.id;

    const updatedPost = await this.postsRepository.findOneBy({ id });

    if (updatedPost) {
      Object.assign(updatedPost, postDto);
      return await this.postsRepository.save(updatedPost);
    }

    throw new NotFoundException(`Post with id = ${id} was not found`);
  }
}
