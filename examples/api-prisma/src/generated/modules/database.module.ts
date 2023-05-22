import { Module } from '@nestjs/common';

import { DatabaseModule as TrxnDatabaseModule } from '@trxn/nestjs-database';

@Module({
  imports: [TrxnDatabaseModule.register({})],
  exports: [TrxnDatabaseModule],
})
export class DatabaseModule {}
