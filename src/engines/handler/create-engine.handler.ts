import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { CreateEngineCommand } from '../commands/create-engine.command';
import { EngineModel } from '../models/engine.model';
import { EnginesRepository } from '../repositories/engines.repository';

@CommandHandler(CreateEngineCommand)
export class CreateEngineHandler
  implements ICommandHandler<CreateEngineCommand>
{
  constructor(private readonly repository: EnginesRepository) {}

  async execute(command: CreateEngineCommand) {
    const { imageId } = command;
    const record = await this.repository.create({ image: imageId });
    const engine = new EngineModel(record._id);
    engine.create(imageId);
    engine.commit();
  }
}
