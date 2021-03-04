import { Module } from '@nestjs/common';
import { LogService } from './services';

@Module({
  providers: [LogService],
  exports: [LogService],
})
export class CoreModule {}
