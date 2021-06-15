import {
  Controller,
  Post,
  Body,
} from '@nestjs/common';
import { EnginesService } from './engines.service';
import { CreateEngineDto } from './dto/create-engine.dto';

@Controller('engines')
export class EnginesController {
  constructor(private readonly enginesService: EnginesService) {}

  @Post()
  async create(@Body() createEngineDto: CreateEngineDto) {
    const engine = await this.enginesService.create(createEngineDto);
    return { id: engine._id, image: engine.image }
  }
}
