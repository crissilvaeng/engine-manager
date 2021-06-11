import { IsNotEmpty, IsOptional, IsString, IsDecimal } from 'class-validator';

export class EngineDto {
  @IsString()
  @IsNotEmpty()
  slug: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsDecimal()
  @IsNotEmpty()
  version: number;
}
