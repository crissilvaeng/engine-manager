import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { DockerService } from 'src/docker/docker.service';
import { EngineCreatedEvent } from '../events/engine-created.event';

@EventsHandler(EngineCreatedEvent)
export class PullEngineHandler implements IEventHandler<EngineCreatedEvent> {
  constructor(private readonly service: DockerService) {}

  handle(event: EngineCreatedEvent) {
    console.log('em tese é isso');
    this.service.pull(event.imageId);
  }
}
