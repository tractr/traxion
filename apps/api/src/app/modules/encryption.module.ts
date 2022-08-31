import { Module } from '@nestjs/common';

import { BcryptModule } from '@tractr/nestjs-bcrypt';

@Module({
  imports: [
    BcryptModule.register({
      saltRounds: 10,
    }),
  ],
  exports: [BcryptModule],
})
export class EncryptionModule {}
