import { Module } from '@nestjs/common';
import { DelayModule } from './delay/delay.module';

@Module({
  imports: [DelayModule],
})
export class AppModule {}
