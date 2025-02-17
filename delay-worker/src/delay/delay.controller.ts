import { Controller } from '@nestjs/common';
import { DelayService } from './delay.service';
import { EventPattern, Payload } from '@nestjs/microservices';
import { MessageDto } from './dto/message.dto';

@Controller('delay')
export class DelayController {
  constructor(private readonly delayService: DelayService) {}

  @EventPattern('send-delay-notification')
  async handlerDelayNotification(@Payload() data: MessageDto) {
    await this.delayService.scheduleNotification(data.userId, data.message);
    return { success: true, message: 'Notification scheduled!' };
  }
}
