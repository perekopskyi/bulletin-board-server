import { BeforeInsert, Column, Entity, JoinColumn, OneToMany } from 'typeorm';
import { Exclude, instanceToPlain } from 'class-transformer';
import { IsOptional } from 'class-validator';
import * as bcrypt from 'bcrypt';
import { BaseEntity } from '../../database/base.entity';
import { PostsEntity } from '../posts/posts.entity';

@Entity({ name: 'users' })
export class UsersEntity extends BaseEntity {
  @Column({ type: 'varchar', nullable: false, unique: true })
  public username: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  public email: string;

  @Exclude({ toPlainOnly: true })
  @Column({ type: 'varchar', nullable: true })
  public password?: string;

  @IsOptional()
  @Column({ type: 'varchar', default: '' })
  public firstName: string;

  @IsOptional()
  @Column({ type: 'varchar', default: '' })
  public lastName: string;

  @Column({ default: false })
  public isRegisteredWithGoogle: boolean;

  @Exclude()
  @Column({ nullable: true })
  public currentHashedRefreshToken?: string;

  @BeforeInsert()
  async hashPassword() {
    if (!this.isRegisteredWithGoogle) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }

  toJSON() {
    return instanceToPlain(this);
  }

  @OneToMany(() => PostsEntity, (post) => post.author)
  @JoinColumn()
  posts: PostsEntity[];
}
