import { AggregateRoot } from '@nestjs/cqrs';
import { EngineCreatedEvent } from '../events/engine-created.event';

export class EngineModel extends AggregateRoot {
  constructor(private readonly id: string) {
    super();
  }

  create(imageId: string) {
    this.apply(new EngineCreatedEvent(this.id, imageId));
  }
}
