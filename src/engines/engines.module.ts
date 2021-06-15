import { Engine, EngineSchema } from './entities/engine.entity';

import { EnginesController } from './engines.controller';
import { EnginesService } from './engines.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Engine.name, schema: EngineSchema },
    ]),
  ],
  controllers: [EnginesController],
  providers: [EnginesService],
})
export class EnginesModule {}
