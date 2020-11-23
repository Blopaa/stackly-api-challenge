import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { UserModule } from './user/user.module';
import { SkillsModule } from './skills/skills.module';
import { Skill } from './skills/skill.entity';
import { User } from './user/user.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get('DATABASE_URL'),
        ssl: {
          rejectUnauthorized: configService.get('NODE_ENV') !== 'production',
        },
        entities: [Skill, User],
      }),
      inject: [ConfigService],
    }),
    UserModule,
    SkillsModule,
    AuthModule,
  ],
})
export class AppModule {}
