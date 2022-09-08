import { BeforeInsert, Column, Entity, JoinColumn, OneToMany } from 'typeorm';
import { Exclude, instanceToPlain } from 'class-transformer';
import * as bcrypt from 'bcrypt';
import { BaseEntity } from './base.entity';
import { IsOptional } from 'class-validator';
import { PostsEntity } from './posts.entity';

@Entity({ name: 'users' })
export class UsersEntity extends BaseEntity {
  @Column({ type: 'varchar', nullable: false, unique: true })
  username: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  email: string;

  @Exclude({ toPlainOnly: true })
  @Column({ type: 'varchar', nullable: false })
  password: string;

  @IsOptional()
  @Column({ type: 'varchar', default: '' })
  firstName: string;

  @IsOptional()
  @Column({ type: 'varchar', default: '' })
  lastName: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  toJSON() {
    return instanceToPlain(this);
  }

  @OneToMany(() => PostsEntity, (post) => post.author)
  @JoinColumn()
  posts: PostsEntity[];
}
