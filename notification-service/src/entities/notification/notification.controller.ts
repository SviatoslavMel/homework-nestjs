import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { NotificationService } from './notification.service';
import { MessageDto } from './dto/message.dto';

@Controller()
export class NotificationController {
  constructor(private readonly usersService: NotificationService) {}

  @EventPattern('user-congratulations')
  handlerCreateUser(@Payload() data: MessageDto): Promise<string> {
    return this.usersService.userNotification(data);
  }
}
