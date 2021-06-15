import {
  Controller,
  Post,
  Body,
} from '@nestjs/common';
import { EnginesService } from './engines.service';
import { CreateEngineDto } from './dto/create-engine.dto';
import { TasksProducer } from '../tasks/tasks.producer';

@Controller('engines')
export class EnginesController {
  constructor(
    private readonly enginesService: EnginesService,
    private readonly tasksScheduler: TasksProducer) {}

  @Post()
  async create(@Body() createEngineDto: CreateEngineDto) {
    const engine = await this.enginesService.create(createEngineDto);
    this.tasksScheduler.process({
      event: 'engine.created',
      payload: engine
    })
    return engine
  }
}
