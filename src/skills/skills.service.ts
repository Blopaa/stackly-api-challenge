import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSkillDto } from './dto';

import { Skill } from './skill.entity';

@Injectable()
export class SkillsService {
  constructor(
    @InjectRepository(Skill)
    private skillRepository: Repository<Skill>,
  ) {}

  async findByName(name: string): Promise<Skill | null> {
    return await this.skillRepository.findOne({ name });
  }

  async create(newSkill: CreateSkillDto): Promise<Skill> {
    const skill = this.skillRepository.create(newSkill);
    return await this.skillRepository.save(skill);
  }
}
