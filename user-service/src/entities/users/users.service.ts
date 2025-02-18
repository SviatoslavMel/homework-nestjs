import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import { CreateUserDto } from './dto/users.create.dto';
import { ClientProxy } from '@nestjs/microservices';
import { config } from '../../config';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @Inject(config.rabbitMQ.transport.notificationDelay)
    private rabbitClient: ClientProxy,
  ) {}

  async createUser(userInfo: CreateUserDto) {
    const user = this.userRepository.create({ name: userInfo.name });
    const saveData = await this.userRepository.save(user);

    if (saveData.id) {
      this.rabbitClient.emit(config.emitEvent.sendDelayNotification, {
        userId: saveData.id,
        message: {
          title: `Hi ${saveData.name}`,
          body: '🎉 your registration completed successfully',
        },
      });
    }

    return user;
  }
}
