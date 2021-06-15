import { Process, Processor } from '@nestjs/bull';

import { EventEmitter2 } from '@nestjs/event-emitter';
import { Job } from 'bull';
import { Logger } from '@nestjs/common';
import { Task } from './dto/task.dto';

@Processor('tasks.queue')
export class TasksConsumer {
  private readonly logger = new Logger(TasksConsumer.name);

  constructor(private readonly emitter: EventEmitter2) {}

  @Process()
  async process(job: Job<Task>): Promise<void> {
    const success = await this.emitter.emit(job.data.event, job.data);
    if (!success) {
      this.logger.error('Job failed. Retrying...', JSON.stringify(job));
      return await job.retry();
    }
  }
}
