import { IsOptional, IsString } from 'class-validator';

export class CreateBoardDto {
  @IsString()
  @IsOptional()
  name: string;
  @IsString()
  @IsOptional()
  color: string;
  @IsOptional()
  function: string;
}
