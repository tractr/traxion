import { Module } from '@nestjs/common';
import { UserModule as TrxnUserModule } from '@trxn/nestjs-user';

import { NestjsServicesModule } from './services.module';

@Module({
  imports: [
    TrxnUserModule.register({
      imports: [NestjsServicesModule],
    }),
  ],
  exports: [TrxnUserModule],
})
export class UserModule {}
