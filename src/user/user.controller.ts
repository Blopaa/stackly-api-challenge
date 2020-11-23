import {
  Controller,
  Post,
  Inject,
  Body,
  UseInterceptors,
  ClassSerializerInterceptor,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AssignSkillDto } from './dto';
import { UserService } from './user.service';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('user')
export class UserController {
  constructor(
    @Inject(UserService)
    private readonly userService: UserService,
  ) {}

  @UseGuards(AuthGuard())
  @Post('skill')
  async assignSkill(@Body() skill: AssignSkillDto, @Request() req) {
    this.userService.assignSkill(skill, req.user.id);

    return {
      message: 'Skill Assigned Successful',
    };
  }
}
