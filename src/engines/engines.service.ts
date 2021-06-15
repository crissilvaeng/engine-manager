import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { CreateEngineCommand } from './commands/create-engine.command';
import { CreateEngineDto } from './dto/create-engine.dto';
import { Injectable } from '@nestjs/common';
import { ListEnginesQuery } from './queries/list-engines.query';

@Injectable()
export class EnginesService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  async createEngine(createEngineDto: CreateEngineDto) {
    return this.commandBus.execute(
      new CreateEngineCommand(createEngineDto.image),
    );
  }

  async listEngines() {
    return this.queryBus.execute(new ListEnginesQuery());
  }
}
