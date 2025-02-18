import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { ClientProxy } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';
import { MessageDto } from './dto/message.dto';

import { RedisConfig } from '../../config/RedisConfig';
import { RabbitMQConfig } from '../../config/RabbitMQConfig';

@Processor(RedisConfig.TASK_CREATE_USER.name)
export class DelayProcessor extends WorkerHost {
  constructor(
    @Inject(RabbitMQConfig.RABBITMQ_NOTIFICATION_DELAY_NAME)
    private rabbitClient: ClientProxy,
  ) {
    super();
  }

  process(job: Job): any {
      console.log('job.name', job.name, RedisConfig.TASK_CREATE_USER.job, job.name === RedisConfig.TASK_CREATE_USER.job)
    if (job.name === RedisConfig.TASK_CREATE_USER.name) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const { userId, message }: MessageDto = job.data;
      this.rabbitClient.emit(RedisConfig.TASK_CREATE_USER.job, {
        userId,
        message,
      });
    }
  }
}
