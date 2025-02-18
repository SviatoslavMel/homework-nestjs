import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { config } from './config';

const { rabbitMQ } = config;

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [
          `amqp://${rabbitMQ.user}:${rabbitMQ.password}@${rabbitMQ.hostname}:${rabbitMQ.port}`,
        ],
        queue: rabbitMQ.queue.notifications,
      },
    },
  );
  await app.listen();
}
bootstrap();
