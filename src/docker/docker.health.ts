import {
  HealthCheckError,
  HealthIndicator,
  HealthIndicatorResult,
} from '@nestjs/terminus';

import { DockerService } from './docker.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DockerHealthIndicator extends HealthIndicator {
  constructor(private readonly service: DockerService) {
    super();
  }

  async ping(key: string): Promise<HealthIndicatorResult> {
    try {
      await this.service.ping();
      return this.getStatus(key, true);
    } catch (err) {
      const result = this.getStatus(key, false, err);
      throw new HealthCheckError(err.message, result);
    }
  }
}
