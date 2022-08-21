import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: 'posts' })
export class PostsEntity extends BaseEntity {
  @Column({ type: 'text', nullable: false })
  title: string;

  @Column({ type: 'text', nullable: false })
  text: string;

  @Column({ type: 'int', default: 0 })
  views: number;

  // @OneToOne(() => UserEntity)
  // @JoinColumn()
  // author: UserEntity;
}
