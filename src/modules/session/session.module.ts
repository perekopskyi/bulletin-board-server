import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionEntity } from './session.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SessionEntity])],
  exports: [TypeOrmModule],
  providers: [],
})
export class SessionModule {}
