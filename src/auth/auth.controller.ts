import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Inject,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto } from '../user/dto';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto, ReadTokenDto } from './dto';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('user')
export class AuthController {
  constructor(
    @Inject(AuthService)
    private readonly authService: AuthService,
  ) {}

  @ApiCreatedResponse({ type: ReadTokenDto })
  @Post('login')
  async login(@Body() user: LoginDto) {
    return this.authService.login(user);
  }

  @ApiCreatedResponse({ type: ReadTokenDto })
  @Post('register')
  async register(@Body() user: CreateUserDto) {
    return this.authService.register(user);
  }
}
