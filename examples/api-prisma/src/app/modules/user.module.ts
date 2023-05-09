import { Module } from '@nestjs/common';

import { NestjsServicesModule } from './services.module';

import { UserModule as TrxnUserModule } from '@trxn/nestjs-user';

@Module({
  imports: [
    TrxnUserModule.register({
      imports: [NestjsServicesModule],
    }),
  ],
  exports: [TrxnUserModule],
})
export class UserModule {}
