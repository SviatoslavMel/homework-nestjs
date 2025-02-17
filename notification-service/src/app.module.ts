import { Module } from '@nestjs/common';
import { UsersModule } from './entities/users/users.modules';

@Module({
  imports: [UsersModule],
})
export class AppModule {}
