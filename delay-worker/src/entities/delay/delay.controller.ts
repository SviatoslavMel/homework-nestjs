import { Controller } from '@nestjs/common';
import { DelayService } from './delay.service';
import { EventPattern, Payload } from '@nestjs/microservices';
import { MessageDto } from './dto/message.dto';

import { config } from '../../config';

@Controller()
export class DelayController {
  constructor(private readonly delayService: DelayService) {}

  @EventPattern(config.handleEvent.sendDelayNotification)
  async handlerDelayNotification(@Payload() data: MessageDto) {
    await this.delayService.scheduleNotification(data);
    return { success: true, message: 'Notification scheduled!' };
  }
}
