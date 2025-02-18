import { Module } from '@nestjs/common';
import { DelayModule } from './entities/delay/delay.module';

@Module({
  imports: [DelayModule],
})
export class AppModule {}
