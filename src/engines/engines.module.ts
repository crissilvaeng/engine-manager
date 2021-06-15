import { Engine, EngineSchema } from './entities/engine.entity';

import { CqrsModule } from '@nestjs/cqrs';
import { CreateEngineHandler } from './handler/create-engine.handler';
import { DockerModule } from 'src/docker/docker.module';
import { EnginesController } from './engines.controller';
import { EnginesRepository } from './repositories/engines.repository';
import { EnginesService } from './engines.service';
import { ListEnginesHandler } from './handler/list-engines.handler';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PullEngineHandler } from './handler/pull-engine.handler';

export const CommandHandlers = [CreateEngineHandler, PullEngineHandler];
export const QueryHandlers = [ListEnginesHandler];

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Engine.name, schema: EngineSchema }]),
    DockerModule,
    CqrsModule,
  ],
  controllers: [EnginesController],
  providers: [
    EnginesRepository,
    EnginesService,
    ...CommandHandlers,
    ...QueryHandlers,
  ],
})
export class EnginesModule {}
