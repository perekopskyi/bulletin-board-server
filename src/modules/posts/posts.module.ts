import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsEntity } from '../../database/entities/posts.entity';
import { UsersEntity } from '../../database/entities/users.entity';
import { AuthModule } from '../auth/auth.module';
import { UsersService } from '../users/users.service';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([PostsEntity, UsersEntity])],
  providers: [PostsService, UsersService],
  controllers: [PostsController],
  exports: [PostsModule],
})
export class PostsModule {}
