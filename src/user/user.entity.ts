import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Expose, Exclude } from 'class-transformer';

import { Skill } from '../skills/skill.entity';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Expose({ name: 'full_name' })
  @Column({ type: 'varchar', name: 'full_name' })
  fullName: string;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Exclude()
  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'varchar' })
  country: string;

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
