import * as Docker from 'dockerode';

import { DockerHealthIndicator } from './docker.health';
import { DockerService } from './docker.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [
    DockerService,
    {
      provide: Docker,
      useValue: new Docker(),
    },
    DockerHealthIndicator,
  ],
  exports: [DockerHealthIndicator, DockerService],
})
export class DockerModule {}
