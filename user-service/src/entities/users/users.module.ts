import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { DatabaseConfig } from '../../config/DatabaseConfig';
import { RabbitMQConfig } from '../../config/RabbitMQConfig';

import { User } from './users.entity';
import { UserService } from './users.service';
import { UserController } from './users.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: DatabaseConfig.DB_HOST,
      port: DatabaseConfig.DB_PORT,
      username: DatabaseConfig.DB_USERNAME,
      password: DatabaseConfig.DB_PASSWORD,
      database: DatabaseConfig.DB_NAME,
      synchronize: true,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
    }),
    TypeOrmModule.forFeature([User]),
    ClientsModule.register([
      {
        name: RabbitMQConfig.RABBITMQ_NOTIFICATION_DELAY_NAME,
        transport: Transport.RMQ,
        options: {
          urls: [RabbitMQConfig.RABBITMQ_URL],
          queue: RabbitMQConfig.RABBITMQ_NOTIFICATION_DELAY_QUEUE,
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UsersModule {}
