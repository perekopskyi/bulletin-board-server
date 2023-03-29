import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { BaseEntity } from '../../database/base.entity';
import { UsersEntity } from '../users/users.entity';

@Entity({ name: 'sessions' })
export class SessionEntity extends BaseEntity {
  @Column({ nullable: true })
  currentHashedRefreshToken: string;

  @OneToOne(() => UsersEntity)
  @JoinColumn()
  user: UsersEntity;
}
