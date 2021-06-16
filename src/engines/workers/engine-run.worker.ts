import { Controller } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { DockerService } from '../../docker/docker.service';

interface Game {
  id: string;
  white: string;
  black: string;
}

@Controller()
export class EngineRunWorker {
  constructor(
    private readonly config: ConfigService,
    private readonly docker: DockerService,
  ) {}

  @MessagePattern('game.start')
  async execute(@Payload() game: Game): Promise<any> {
    return await Promise.all(
      [game.white, game.black].map((player) => {
        this.docker.run(player, {
          env: [
            `NATS_URL=${this.config.get('ENGINES_NATS_URL')}`,
            `NATS_SUBJECT=games.*.${player.replace(/[^a-zA-Z0-9]/, '-')}`,
          ],
        });
      }),
    );
  }
}
