import { Module } from '@nestjs/common';
import { UsersModule } from './entities/users/users.module';

@Module({
  imports: [UsersModule],
})
export class AppModule {}
