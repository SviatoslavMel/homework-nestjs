import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { RabbitMQConfig } from './config/RabbitMQConfig';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [RabbitMQConfig.RABBITMQ_URL],
        queue: 'notifications',
      },
    },
  );
  await app.listen();
}
bootstrap();
