import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: 'user' })
export class UserEntity {
  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  password: string;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  // toResponse() {
  //   const { password, ...rest } = this;
  //   return { ...rest };
  // }
}
