import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from './user/user.module';
import { SkillsModule } from './skills/skills.module';
import { Skill } from './skills/skill.entity';
import { User } from './user/user.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      username: 'stackly',
      password: 'stackly',
      database: 'stackly',
      port: 5432,
      entities: [Skill, User],
      synchronize: process.env.NODE_ENV !== 'production',
      logger: 'debug',
    }),
    UserModule,
    SkillsModule,
    AuthModule,
  ],
})
export class AppModule {}
