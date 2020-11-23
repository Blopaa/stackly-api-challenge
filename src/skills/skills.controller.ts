import {
  Controller,
  Post,
  Inject,
  Body,
  UseInterceptors,
  ClassSerializerInterceptor,
  BadRequestException,
} from '@nestjs/common';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { Skill } from './skill.entity';

import { CreateSkillDto } from './dto';
import { SkillsService } from './skills.service';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('skills')
export class SkillsController {
  constructor(
    @Inject(SkillsService)
    private readonly skillsService: SkillsService,
  ) {}

  @ApiCreatedResponse({ type: Skill })
  @Post('register')
  async create(@Body() skill: CreateSkillDto) {
    try {
      return await this.skillsService.create(skill);
    } catch (err) {
      throw new BadRequestException('already exist skill with same name');
    }
  }
}
