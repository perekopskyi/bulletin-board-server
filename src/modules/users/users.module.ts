import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsEntity } from '../posts/posts.entity';
import { SessionModule } from '../session/session.module';
import { UserController } from './users.controller';
import { UsersEntity } from './users.entity';
import { UsersService } from './users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersEntity, PostsEntity]),
    SessionModule,
  ],
  providers: [UsersService],
  controllers: [UserController],
  exports: [UsersModule],
})
export class UsersModule {}
