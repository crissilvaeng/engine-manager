import { PickType } from '@nestjs/swagger';
import { EngineDto } from './engine.dto';

export class UpdateEngineDto extends PickType(EngineDto, [
  'description',
] as const) {}
