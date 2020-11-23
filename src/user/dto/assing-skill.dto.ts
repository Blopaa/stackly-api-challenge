import { IsString, IsNotEmpty } from 'class-validator';

export class AssignSkillDto {
  @IsString()
  @IsNotEmpty()
  skillName: string;
}
