import {
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @Column({ type: 'boolean', default: false })
  isArchived: boolean;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  created: Date;

  @Column({ type: 'varchar', length: 300, nullable: true })
  createdBy: string;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updated: Date;

  @Column({ type: 'varchar', length: 300, nullable: true })
  updatedBy: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  internalComment: string | null;
}
