import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

import { config } from '../../config';
import { MessageDto } from './dto/message.dto';

const { redis } = config;

@Injectable()
export class DelayService {
  constructor(
    @InjectQueue(redis.task.createUser.name)
    private notificationQueue: Queue,
  ) {}

  async scheduleNotification(data: MessageDto) {
    await this.notificationQueue.add(
      redis.task.createUser.name, // Job name
      data,
      {
        delay: redis.task.createUser.delay,
        attempts: 3, // Retry up to 3 times on failure
        removeOnComplete: true,
      },
    );
  }
}
