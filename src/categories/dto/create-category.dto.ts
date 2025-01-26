import { IsOptional, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @IsOptional()
  title: string;
  @IsString()
  @IsOptional()
  subtitle: string;
  @IsString()
  @IsOptional()
  status: string;
  @IsString()
  @IsOptional()
  label: string;
  @IsString()
  @IsOptional()
  priority: string;
  @IsString()
  @IsOptional()
  description: string;
  @IsString()
  @IsOptional()
  percentage: number;
  @IsString()
  @IsOptional()
  assign: { id: number }[];
  @IsString()
  @IsOptional()
  logo: string;
  @IsString()
  @IsOptional()
  isFavorite: boolean;
  @IsString()
  @IsOptional()
  color: string;
}
