import { Module } from '@nestjs/common';

import { BcryptModule } from '@trxn/nestjs-bcrypt';

@Module({
  imports: [
    BcryptModule.register({
      saltRounds: 10,
    }),
  ],
  exports: [BcryptModule],
})
export class EncryptionModule {}
