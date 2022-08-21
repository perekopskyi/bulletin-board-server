import { BeforeInsert, Column, Entity } from 'typeorm';
import { Exclude, instanceToPlain } from 'class-transformer';
import * as bcrypt from 'bcrypt';
import { BaseEntity } from './base.entity';
import { IsOptional } from 'class-validator';

@Entity({ name: 'users' })
export class UsersEntity extends BaseEntity {
  @Column({ type: 'varchar', nullable: false, unique: true })
  username: string;

  @Column({ type: 'varchar', nullable: false })
  email: string;

  @Exclude({ toPlainOnly: true })
  @Column({ type: 'varchar', nullable: false })
  password: string;

  @IsOptional()
  @Column({ type: 'varchar', nullable: true })
  firstName: string;

  @IsOptional()
  @Column({ type: 'varchar', nullable: true })
  lastName: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  toJSON() {
    return instanceToPlain(this);
  }

  // toResponse() {
  //   const { password, ...rest } = this;
  //   return { ...rest };
  // }
}
