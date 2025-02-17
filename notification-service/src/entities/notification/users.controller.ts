import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { UsersService } from './users.service';
import { UserDto } from './dto/users.dto';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @EventPattern('create-user')
  handlerCreateUser(@Payload() data: UserDto): Promise<string> {
    return this.usersService.userNotification(data);
  }
}
