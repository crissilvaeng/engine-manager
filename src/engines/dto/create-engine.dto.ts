import { IsString } from 'class-validator';

export class CreateEngineDto {
  @IsString()
  image: string;
}
