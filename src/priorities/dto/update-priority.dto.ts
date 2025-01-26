import { IsOptional, IsString } from 'class-validator';

export class UpdatePriorityDto {
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
