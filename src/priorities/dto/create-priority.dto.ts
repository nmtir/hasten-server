import { IsOptional, IsString } from 'class-validator';

export class CreatePriorityDto {
  @IsString()
  @IsOptional()
  name: string;
  @IsString()
  @IsOptional()
  color: string;
  @IsString()
  @IsOptional()
  tasks: { id: number; title: string }[];
}
