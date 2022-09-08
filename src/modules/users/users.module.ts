import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsEntity } from '../../database/entities/posts.entity';
import { UsersEntity } from '../../database/entities/users.entity';
import { UserController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity, PostsEntity])],
  providers: [UsersService],
  controllers: [UserController],
  exports: [UsersModule],
})
export class UsersModule {}
