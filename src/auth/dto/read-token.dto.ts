import { Expose } from 'class-transformer';

import { User } from '../../user/user.entity';

export class ReadTokenDto {
  @Expose({ name: 'access_token' })
  accessToken: string;

  @Expose({ name: 'user_data' })
  userData: User;

  constructor(values: ReadTokenDto) {
    Object.assign(this, values);
  }
}
