import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/users.dto';

@Injectable()
export class UsersService {
  async userNotification(userData: UserDto): Promise<string> {
    // Simulate push notification (replace with real API call)
    await fetch('https://webhook.site/f428bbb8-e900-47c9-bf26-9242dfba8609', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(UserDto),
    });

    return userData.name;
  }
}
