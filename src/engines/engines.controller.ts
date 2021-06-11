import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateEngineDto } from './dto/create-engine.dto';
import { EngineDto } from './dto/engine.dto';
import { UpdateEngineDto } from './dto/update-engine.dto';
import { EnginesService } from './engines.service';

@ApiTags('Engines')
@Controller('engines')
@UseInterceptors(ClassSerializerInterceptor)
export class EnginesController {
  constructor(private readonly enginesService: EnginesService) {}

  @Post()
  create(@Body() createEngineDto: CreateEngineDto): Promise<EngineDto> {
    return this.enginesService.create(createEngineDto);
  }

  @Get()
  findAll(): Promise<EngineDto[]> {
    return this.enginesService.findAll();
  }

  @Get(':slug')
  @ApiNotFoundResponse()
  async findOne(@Param('slug') slug: string): Promise<EngineDto> {
    const engine = await this.enginesService.findOne(slug);
    if (!engine) {
      throw new NotFoundException();
    }
    return engine;
  }

  @HttpCode(204)
  @Patch(':slug')
  @ApiNoContentResponse()
  async update(
    @Param('slug') slug: string,
    @Body() updateEngineDto: UpdateEngineDto,
  ): Promise<void> {
    await this.enginesService.update(slug, updateEngineDto);
  }
}
