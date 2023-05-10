import { Module } from '@nestjs/common';
import { DatabaseModule } from '@trxn/nestjs-database';

@Module({
  imports: [DatabaseModule.register({})],
  exports: [DatabaseModule],
})
export class PrismaModule {}
