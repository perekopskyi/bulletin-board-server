import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: 'post' })
export class PostEntity {
  @Column()
  title: string;

  @Column('text')
  text: string;

  @Column('int')
  views: number;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  // @OneToOne(() => UserEntity)
  // @JoinColumn()
  // author: UserEntity;
}
