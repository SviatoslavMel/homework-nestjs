import { Processor } from '@nestjs/bullmq';
import { Inject } from '@nestjs/common';
import { Job } from 'bullmq';
import { ClientProxy } from '@nestjs/microservices';
import { MessageDto } from './dto/message.dto';

import { RabbitMQConfig } from '../config/RabbitMQConfig';

@Processor('notification_queue')
export class DelayProcessor {
  constructor(
    @Inject(RabbitMQConfig.RABBITMQ_NOTIFICATION_DELAY_NAME)
    private rabbitClient: ClientProxy,
  ) {}

  sendNotification(job: Job) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { userId, message }: MessageDto = job.data;

    console.log(`📩 Sending notification to user ${userId}: "${message}"`);
    this.rabbitClient.emit('send-delay-notification', {
      userId,
      message,
    });
  }
}
