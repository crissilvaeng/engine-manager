import { IsString } from 'class-validator';

export class EngineDto {
  @IsString()
  _id: string;

  @IsString()
  image: string;
}
