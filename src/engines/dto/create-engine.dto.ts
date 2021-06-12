import { OmitType } from '@nestjs/swagger';
import { EngineDto } from './engine.dto';

export class CreateEngineDto extends OmitType(EngineDto, ['slug'] as const) {}
