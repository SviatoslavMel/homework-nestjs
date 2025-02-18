import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { RedisConfig } from '../../config/RedisConfig';
import { RabbitMQConfig } from '../../config/RabbitMQConfig';
import { DelayProcessor } from './delay.processor';
import { DelayService } from './delay.service';
import { DelayController } from './delay.controller';

@Module({
  imports: [
    BullModule.forRoot({
      connection: {
        host: RedisConfig.REDIS_HOSTNAME,
        port: RedisConfig.REDIS_PORT,
      },
    }),
    BullModule.registerQueue({
      name: RedisConfig.TASK_CREATE_USER.name,
    }),
    ClientsModule.registerAsync([
      {
        name: RabbitMQConfig.RABBITMQ_NOTIFICATION_DELAY_NAME,
        useFactory: () => {
          return {
            transport: Transport.RMQ,
            options: {
              reconnect: true,
              urls: [RabbitMQConfig.RABBITMQ_URL],
              // queue: RabbitMQConfig.RABBITMQ_NOTIFICATION_DELAY_QUEUE,
              queue: RabbitMQConfig.RABBITMQ_NOTIFICATION_QUEUE,
              queueOptions: {
                durable: true,
              },
            },
          };
        },
      },
    ]),
  ],
  controllers: [DelayController],
  providers: [DelayService, DelayProcessor],
})
export class DelayModule {}
