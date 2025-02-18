import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { config } from '../../config';

import { DelayProcessor } from './delay.processor';
import { DelayService } from './delay.service';
import { DelayController } from './delay.controller';

const { redis, rabbitMQ } = config;

@Module({
  imports: [
    BullModule.forRoot({
      connection: {
        host: redis.hostname,
        port: redis.port,
      },
    }),
    BullModule.registerQueue({
      name: redis.task.createUser.name,
    }),
    ClientsModule.registerAsync([
      {
        name: rabbitMQ.transport.notificationDelay,
        useFactory: () => {
          return {
            transport: Transport.RMQ,
            options: {
              reconnect: true,
              urls: [
                `amqp://${rabbitMQ.user}:${rabbitMQ.password}@${rabbitMQ.hostname}:${rabbitMQ.port}`,
              ],
              queue: rabbitMQ.queue.notifications,
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
