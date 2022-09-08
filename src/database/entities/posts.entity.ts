import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { UsersEntity } from './users.entity';

@Entity({ name: 'posts' })
export class PostsEntity extends BaseEntity {
  @Column({ type: 'text', nullable: false })
  title: string;

  @Column({ type: 'text', nullable: false })
  text: string;

  @Column({ type: 'int', default: 0 })
  views: number;

  @Column({ nullable: true })
  authorId: string;

  @ManyToOne(() => UsersEntity, (user) => user.posts)
  @JoinColumn()
  author: UsersEntity;

  @Column({ type: 'text', nullable: true })
  image: string;

  // TODO add categoryId
  // @Column({ type: 'timestamptz', default: () =>  })
  // expiredAt: Date;
}
