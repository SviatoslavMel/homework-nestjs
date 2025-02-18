import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { ClientProxy } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';
import { MessageDto } from './dto/message.dto';

import { config } from '../../config';

const { redis, rabbitMQ } = config;

@Processor(redis.task.createUser.name)
export class DelayProcessor extends WorkerHost {
  constructor(
    @Inject(rabbitMQ.transport.notificationDelay)
    private rabbitClient: ClientProxy,
  ) {
    super();
  }

  process(job: Job): any {
    if (job.name === redis.task.createUser.name) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const { userId, message }: MessageDto = job.data;
      this.rabbitClient.emit(redis.task.createUser.job, {
        userId,
        message,
      });
    }
  }
}
