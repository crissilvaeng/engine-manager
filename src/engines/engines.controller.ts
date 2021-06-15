import { Controller, Post, Body, Get } from '@nestjs/common';
import { CreateEngineDto } from './dto/create-engine.dto';
import { EngineDto } from './dto/engine.dto';
import { EnginesService } from './engines.service';

@Controller('engines')
export class EnginesController {
  constructor(private readonly service: EnginesService) {}

  @Post()
  async create(@Body() createEngineDto: CreateEngineDto) {
    return this.service.createEngine(createEngineDto);
  }

  @Get()
  async getAll(): Promise<EngineDto[]> {
    return await this.service.listEngines();
  }
}
