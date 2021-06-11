import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateEngineDto } from './dto/create-engine.dto';
import { EngineDto } from './dto/engine.dto';
import { UpdateEngineDto } from './dto/update-engine.dto';
import { Engine } from './entities/engine.entity';

@Injectable()
export class EnginesService {
  constructor(
    @InjectModel(Engine)
    private readonly repository: typeof Engine,
  ) {}

  async create(engine: CreateEngineDto): Promise<EngineDto> {
    const result = await this.repository.create({ ...engine });
    return result;
  }

  async findAll(): Promise<EngineDto[]> {
    return await this.repository.findAll();
  }

  async findOne(slug: string): Promise<EngineDto> {
    return await this.repository.findOne({ where: { slug } });
  }

  async update(slug: string, engine: UpdateEngineDto): Promise<number> {
    return await this.repository
      .update({ ...engine }, { where: { slug } })
      .then((result) => result[0]);
  }
}
