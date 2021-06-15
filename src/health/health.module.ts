import { DockerModule } from 'src/docker/docker.module';
import { HealthController } from './health.controller';
import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';

@Module({
  imports: [TerminusModule, DockerModule],
  controllers: [HealthController],
})
export class HealthModule {}
