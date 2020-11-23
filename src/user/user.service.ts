import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as argon2 from 'argon2';

import { CreateUserDto, AssignSkillDto } from './dto';
import { User } from './user.entity';
import { SkillsService } from '../skills/skills.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @Inject(SkillsService)
    private readonly skillsService: SkillsService,
  ) {}

  async findById(id: number, relations: string[] = []): Promise<User | null> {
    const user = await this.userRepository.findOne(id, {
      relations,
    });
    if (!user) throw new NotFoundException('User Not Found');
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.userRepository.findOne({ email });
    if (!user) throw new NotFoundException('User Not Found');
    return user;
  }

  async create(newUser: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(newUser);
    user.password = await argon2.hash(user.password);
    try {
      return await this.userRepository.save(user);
    } catch (err) {
      throw new BadRequestException(
        'already exist account with the same email',
      );
    }
  }

  async assignSkill({ skillName }: AssignSkillDto, id: number): Promise<void> {
    const user = await this.findById(id, ['skills']);
    const skill = await this.skillsService.findByName(skillName);

    user.skills.push(skill);

    this.userRepository.save(user);
  }
}
