import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { RabbitMQConfig } from '../config/RabbitMQConfig';

const DELAY_TIME: number = 60 * 100;
// 24 * 60 * 60 * 1000; // 24 hours delay

@Injectable()
export class DelayService {
  constructor(
    @InjectQueue(RabbitMQConfig.RABBITMQ_NOTIFICATION_DELAY_QUEUE)
    private notificationQueue: Queue,
  ) {}

  async scheduleNotification(userId: number, message: string) {
    await this.notificationQueue.add(
      'sendNotification', // Job name
      { userId, message },
      {
        delay: DELAY_TIME,
        attempts: 3, // Retry up to 3 times on failure
        removeOnComplete: true,
      },
    );
  }
}
