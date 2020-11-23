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
      async useFactory(configService: ConfigService) {
        if (configService.get('NODE_ENV') !== 'production') {
          return {
            type: 'postgres',
            username: 'stackly',
            password: 'stackly',
            database: 'stackly',
            synchronize: true,
            entities: [Skill, User],
          };
        }

        return {
          type: 'postgres',
          url: configService.get('DATABASE_URL'),
          synchronize: false,
          extra: {
            ssl: true,
          },
          entities: [Skill, User],
        };
      },
      inject: [ConfigService],
    }),
    UserModule,
    SkillsModule,
    AuthModule,
  ],
})
export class AppModule {}
