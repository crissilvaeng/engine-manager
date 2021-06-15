import { EngineDto } from './engine.dto';
import { OmitType } from '@nestjs/swagger';

export class CreateEngineDto extends OmitType(EngineDto, ['_id'] as const) {}
