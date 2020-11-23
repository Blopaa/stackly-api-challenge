import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';

import { CreateUserDto } from '../user/dto';
import { UserService } from '../user/user.service';
import { ReadTokenDto, LoginDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(JwtService)
    private readonly jwtService: JwtService,
    @Inject(UserService)
    private readonly userService: UserService,
  ) {}

  async login({ email, password }: LoginDto) {
    const user = await this.userService.findByEmail(email);
    if (!(await argon2.verify(user.password, password)))
      throw new UnauthorizedException('Invalid Credentials');

    return new ReadTokenDto({
      accessToken: this.jwtService.sign({ id: user.id }),
      userData: user,
    });
  }

  async register(newUser: CreateUserDto): Promise<ReadTokenDto> {
    const user = await this.userService.create(newUser);
    return new ReadTokenDto({
      accessToken: this.jwtService.sign({ id: user.id }),
      userData: user,
    });
  }
}
