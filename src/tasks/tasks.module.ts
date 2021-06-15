import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { TasksConsumer } from './tasks.consumer';
import { TasksProducer } from './tasks.producer';

@Module({
  imports: [BullModule.registerQueue({ name: 'tasks.queue' })],
  providers: [TasksConsumer, TasksProducer],
  exports: [TasksProducer],
})
export class TasksModule {}
