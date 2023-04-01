import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  CreatePostDto,
  PostDto,
  DetailedPostDto,
  UpdatePostDto,
} from './post.dto';
import { UserDto } from '../users/user.dto';
import { JwtAuthGuard } from '../auth/guards/jwtAuth.guard';
import { PostsService } from './posts.service';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @ApiOperation({ summary: 'Find all posts or posts by userId' })
  @ApiResponse({ status: HttpStatus.OK, type: [PostDto] })
  @Get()
  findAll(@Query('userId') userId?: string) {
    return this.postsService.findAll(userId);
  }

  @ApiOperation({ summary: 'Find post by id' })
  @ApiResponse({ status: HttpStatus.OK, type: PostDto })
  @Get(':postId')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('postId') postId: string): Promise<DetailedPostDto> {
    return this.postsService.findOne(postId);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create post' })
  @ApiResponse({ status: HttpStatus.CREATED, type: PostDto })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  create(
    @Body()
    postDto: CreatePostDto,
    @Req() req: any,
  ): Promise<PostDto> {
    const user = <UserDto>req.user;
    return this.postsService.create(user, postDto);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':postId')
  update(@Param('postId') postId: string, @Body() postDto: UpdatePostDto) {
    return this.postsService.update(postId, postDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Delete post by id' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':postId')
  remove(@Param('postId') postId: string) {
    return this.postsService.remove(postId);
  }
}
