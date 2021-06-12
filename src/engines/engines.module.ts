import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Engine } from './entities/engine.entity';
import { EnginesController } from './engines.controller';
import { EnginesService } from './engines.service';

@Module({
  imports: [SequelizeModule.forFeature([Engine])],
  controllers: [EnginesController],
  providers: [EnginesService],
})
export class EnginesModule {}
