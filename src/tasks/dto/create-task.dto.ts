import { IsOptional } from 'class-validator';
import { Tag } from '../../tags/entities/tag.entity';

export class CreateTaskDto {
  @IsOptional()
  boardId: number;
  @IsOptional()
  title: string;
  @IsOptional()
  desc: string;
  @IsOptional()
  tags: Tag[];
  @IsOptional()
  priorityId: number;
  @IsOptional()
  start: string;
  @IsOptional()
  end: string;
  @IsOptional()
  status: string;
  @IsOptional()
  userId: number;
  @IsOptional()
  categoryId: number;
  @IsOptional()
  taskId: number;
}
