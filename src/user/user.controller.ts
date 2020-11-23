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
import { ApiBearerAuth, ApiCreatedResponse } from '@nestjs/swagger';

import { AssignSkillDto } from './dto';
import { UserService } from './user.service';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('user')
export class UserController {
  constructor(
    @Inject(UserService)
    private readonly userService: UserService,
  ) {}

  @ApiCreatedResponse({
    schema: {
      properties: {
        message: { type: 'string', default: 'Skill Assigned Successful' },
      },
    },
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Post('skill')
  async assignSkill(@Body() skill: AssignSkillDto, @Request() req) {
    this.userService.assignSkill(skill, req.user.id);

    return {
      message: 'Skill Assigned Successful',
    };
  }
}
