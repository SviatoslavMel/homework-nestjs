import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { config } from '../../config';

import { User } from './users.entity';
import { UserService } from './users.service';
import { UserController } from './users.controller';

const { database, rabbitMQ } = config;

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: database.host,
      port: database.port,
      username: database.userName,
      password: database.userPassword,
      database: database.database.users,
      synchronize: true,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
    }),
    TypeOrmModule.forFeature([User]),
    ClientsModule.register([
      {
        name: rabbitMQ.transport.notificationDelay,
        transport: Transport.RMQ,
        options: {
          urls: [
            `amqp://${rabbitMQ.user}:${rabbitMQ.password}@${rabbitMQ.hostname}:${rabbitMQ.port}`,
          ],
          queue: rabbitMQ.queue.notificationsDelay,
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
