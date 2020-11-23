import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSkillDto {
  @ApiProperty({ example: 'Javascript' })
  @IsString()
  @IsNotEmpty()
  name: string;
}
