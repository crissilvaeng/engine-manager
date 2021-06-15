import { Controller, Get } from '@nestjs/common';
import {
  DiskHealthIndicator,
  HealthCheck,
  HealthCheckService,
  MemoryHealthIndicator,
  MicroserviceHealthIndicator,
  MongooseHealthIndicator,
} from '@nestjs/terminus';
import { NatsOptions, RedisOptions, Transport } from '@nestjs/microservices';

import { ConfigService } from '@nestjs/config';
import { DockerHealthIndicator } from '../docker/docker.health';

@Controller('health')
export class HealthController {
  constructor(
    private readonly config: ConfigService,
    private readonly disk: DiskHealthIndicator,
    private readonly docker: DockerHealthIndicator,
    private readonly health: HealthCheckService,
    private readonly memory: MemoryHealthIndicator,
    private readonly microservice: MicroserviceHealthIndicator,
    private readonly mongoose: MongooseHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      async () => this.docker.ping('docker_daemon'),
      async () => this.mongoose.pingCheck('mongoose'),
      async () => this.memory.checkHeap('memory_heap', 200 * 1024 * 1024),
      async () => this.memory.checkRSS('memory_rss', 3000 * 1024 * 1024),
      async () =>
        this.disk.checkStorage('disk', { thresholdPercent: 0.75, path: '/' }),
      async () =>
        this.microservice.pingCheck<RedisOptions>('redis', {
          transport: Transport.REDIS,
          options: {
            url: this.config.get<string>('REDIS_URL'),
          },
        }),
      async () =>
        this.microservice.pingCheck<NatsOptions>('nats', {
          transport: Transport.NATS,
          options: {
            url: this.config.get<string>('NATS_URL'),
          },
        }),
    ]);
  }
}
