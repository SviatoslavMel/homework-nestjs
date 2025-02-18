import { Injectable } from '@nestjs/common';
import { MessageDto } from './dto/message.dto';

import { RestConfig } from '../../config/RestConfig';

@Injectable()
export class NotificationService {
  async userNotification(message: MessageDto): Promise<any> {
    console.log('message', `https://${RestConfig.NOTIFICATION_HOSTNAME}/${RestConfig.NOTIFICATION_PATH}`, message)
    await fetch(
      `https://${RestConfig.NOTIFICATION_HOSTNAME}/${RestConfig.NOTIFICATION_PATH}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(message),
      },
    );

    return message;
  }
}
