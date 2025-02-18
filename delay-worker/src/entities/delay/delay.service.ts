import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { RedisConfig } from '../../config/RedisConfig';
import { MessageDto } from './dto/message.dto';

@Injectable()
export class DelayService {
  constructor(
    @InjectQueue(RedisConfig.TASK_CREATE_USER.name)
    private notificationQueue: Queue,
  ) {}

  async scheduleNotification(data: MessageDto) {
    await this.notificationQueue.add(
      RedisConfig.TASK_CREATE_USER.name, // Job name
      data,
      {
        delay: RedisConfig.TASK_CREATE_USER.delay,
        attempts: 3, // Retry up to 3 times on failure
        removeOnComplete: true,
      },
    );
  }
}
