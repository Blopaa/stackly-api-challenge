import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Entity('skill')
export class Skill {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ type: 'varchar', unique: true })
  name: string;

  @ApiProperty({ name: 'created_at' })
  @Expose({ name: 'created_at' })
  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;
}
