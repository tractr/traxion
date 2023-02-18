import { Module } from '@nestjs/common';

import { ModelsModule } from './models.module';

import { UserModule as TraxionUserModule } from '@trxn/nestjs-user';

@Module({
  imports: [
    TraxionUserModule.register({
      imports: [ModelsModule],
    }),
  ],
  exports: [TraxionUserModule],
})
export class UserModule {}
