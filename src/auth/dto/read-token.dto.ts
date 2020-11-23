import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

import { User } from '../../user/user.entity';

export class ReadTokenDto {
  @ApiProperty({ name: 'access_token' })
  @Expose({ name: 'access_token' })
  accessToken: string;

  @ApiProperty({ name: 'user_data' })
  @Expose({ name: 'user_data' })
  userData: User;

  constructor(values: ReadTokenDto) {
    Object.assign(this, values);
  }
}
