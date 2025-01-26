import { IsOptional } from 'class-validator';

export class UpdateTaskDto {
  @IsOptional()
  boardId: number;
  @IsOptional()
  title: string;
  @IsOptional()
  desc: string;
  @IsOptional()
  priorityId: number;
  @IsOptional()
  start: string;
  @IsOptional()
  end: string;
  @IsOptional()
  status: string;
  @IsOptional()
  categoryId: number;
}
