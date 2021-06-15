import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateEngineDto } from '../dto/create-engine.dto';
import { Engine, EngineDocument } from '../entities/engine.entity';

@Injectable()
export class EnginesRepository {
  constructor(
    @InjectModel(Engine.name)
    private readonly engineModel: Model<EngineDocument>,
  ) {}

  async create(createEngineDto: CreateEngineDto) {
    return await this.engineModel.create({ ...createEngineDto });
  }

  async list() {
    return await this.engineModel.find({});
  }

  async find(id) {
    return await this.engineModel.findById(id);
  }
}
