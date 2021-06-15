import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';
import { Job } from 'bull';
import { Task } from './dto/task.dto';

@Injectable()
export class TasksProducer {
  constructor(@InjectQueue('tasks.queue') private readonly queue: Queue) {}

  process(task: Task): Promise<Job<Task>> {
    return this.queue.add(task, { delay: task.delay });
  }
}
