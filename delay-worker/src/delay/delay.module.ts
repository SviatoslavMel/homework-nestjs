import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { RedisConfig } from '../config/RedisConfig';
import { DelayProcessor } from './delay.processor';
import { DelayService } from './delay.service';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'notification_queue',
      connection: {
        host: RedisConfig.REDIS_HOSTNAME,
        port: RedisConfig.REDIS_PORT,
      },
    }),
  ],
  providers: [DelayProcessor, DelayService],
  exports: [DelayService],
})
export class DelayModule {}
