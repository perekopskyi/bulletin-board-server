import { Column, Entity, JoinColumn, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { PostsEntity } from './posts.entity';

@Entity()
export class Category extends BaseEntity {
  @Column({ type: 'varchar', nullable: false, unique: true })
  public title: string;

  @OneToMany(() => PostsEntity, (post) => post.category)
  @JoinColumn()
  posts: PostsEntity[];
}
