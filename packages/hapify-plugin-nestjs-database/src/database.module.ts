import { Global, Module } from '@nestjs/common';

import { DatabaseService } from './services';

@Global()
@Module({
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule {}
