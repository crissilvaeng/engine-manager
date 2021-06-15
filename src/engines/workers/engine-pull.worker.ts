import { DockerService } from "src/docker/docker.service";
import { Engine } from "../entities/engine.entity";
import { Injectable } from "@nestjs/common";
import { OnEvent } from '@nestjs/event-emitter';
import { Task } from "src/tasks/dto/task.dto";

@Injectable()
export class EnginePullWorker {

  constructor(private readonly docker: DockerService) {}
  
  @OnEvent('engine.created', { async: true })
  async process(task: Task) {
    const engine = task.payload as Engine;
    await this.docker.pull(engine.image)
  }
}
