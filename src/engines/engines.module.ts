import { Engine, EngineSchema } from './entities/engine.entity';

import { DockerModule } from '../docker/docker.module';
import { EnginePullWorker } from './workers/engine-pull.worker';
import { EnginesController } from './engines.controller';
import { EnginesService } from './engines.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TasksModule } from '../tasks/tasks.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Engine.name, schema: EngineSchema },
    ]),
    TasksModule,
    DockerModule
  ],
  controllers: [EnginesController],
  providers: [EnginesService, EnginePullWorker],
})
export class EnginesModule {}
