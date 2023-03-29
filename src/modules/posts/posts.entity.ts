import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../database/base.entity';
import { Category } from '../category/category.entity';
import { UsersEntity } from '../users/users.entity';

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

  @ManyToOne(() => Category, (category) => category.posts)
  @JoinColumn()
  category: Category;

  @Column({ type: 'text', nullable: true })
  image: string;

  // @Column({ type: 'timestamptz', default: () =>  })
  // expiredAt: Date;
}
