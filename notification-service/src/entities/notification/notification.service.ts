import { Injectable } from '@nestjs/common';
import { MessageDto } from './dto/message.dto';

import { config } from '../../config';

@Injectable()
export class NotificationService {
  async userNotification(message: MessageDto): Promise<any> {
    await fetch(
      `https://${config.rest.notification.hostname}/${config.rest.notification.sendPath}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(message),
      },
    );

    return message;
  }
}
