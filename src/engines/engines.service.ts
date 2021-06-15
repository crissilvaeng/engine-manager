import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateEngineDto } from './dto/create-engine.dto';
import { Engine, EngineDocument } from './entities/engine.entity';

@Injectable()
export class EnginesService {
  constructor(
    @InjectModel(Engine.name)
    private readonly engineModel: Model<EngineDocument>,
  ) {}

  create(createEngineDto: CreateEngineDto) {
    return this.engineModel.create({ ...createEngineDto });
  }
}
