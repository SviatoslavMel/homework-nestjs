import { Module } from '@nestjs/common';
import { NotificationModules } from './entities/notification/notification.modules';

@Module({
  imports: [NotificationModules],
})
export class AppModule {}
