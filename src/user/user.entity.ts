import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Expose, Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

import { Skill } from '../skills/skill.entity';

@Entity('user')
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ name: 'full_name' })
  @Expose({ name: 'full_name' })
  @Column({ type: 'varchar', name: 'full_name' })
  fullName: string;

  @ApiProperty()
  @Column({ type: 'varchar', unique: true })
  email: string;

  @Exclude()
  @Column({ type: 'varchar' })
  password: string;

  @ApiProperty()
  @Column({ type: 'varchar' })
  country: string;

  @ApiProperty({ name: 'created_at' })
  @Expose({ name: 'created_at' })
  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @ManyToMany(() => Skill)
  @JoinTable({
    name: 'user_skills',
    joinColumn: { name: 'user_id' },
    inverseJoinColumn: { name: 'skill_id' },
  })
  skills: Skill[];
}
