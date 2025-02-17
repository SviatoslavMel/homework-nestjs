import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import { CreateUserDto } from './dto/users.create.dto';
import { RabbitMQConfig } from '../../config/RabbitMQConfig';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @Inject(RabbitMQConfig.RABBITMQ_NOTIFICATION_DELAY_NAME)
    private rabbitClient: ClientProxy,
  ) {}

  async createUser(userInfo: CreateUserDto) {
    const user = this.userRepository.create({ name: userInfo.name });
    const saveData = await this.userRepository.save(user);

    if (saveData.id) {
      console.log('user-service saveData', saveData);
      this.rabbitClient.emit('send-delay-notification', {
        userId: saveData.id,
        message: `${saveData.name}, congratulations with registration`,
      });
    }

    return user;
  }
}
