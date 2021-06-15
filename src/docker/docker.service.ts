import * as Docker from 'dockerode';

import { Injectable } from '@nestjs/common';

export interface RunOptions {
  command?: string[];
  env: string[];
}

@Injectable()
export class DockerService {
  constructor(private readonly docker: Docker) {}

  async ping() {
    return this.docker.ping();
  }

  async run(image, options: RunOptions) {
    await this.docker.pull(image);
    return this.docker.run(image, options.command, null, {
      Env: options.env,
      Labels: { yifan: 'player' },
      NetworkMode: 'host'
    });
  }

  async pull(image) {
    await this.docker.pull(image);
  }
}
