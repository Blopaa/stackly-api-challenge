import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';
import { Expose } from 'class-transformer';

@Entity('skill')
export class Skill {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', unique: true })
  name: string;

  @Expose({ name: 'created_at' })
  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;
}
