import { Module } from '@nestjs/common';
import { DatabaseService } from './services';

@Module({
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule {}
