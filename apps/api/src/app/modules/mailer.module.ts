import { Module } from '@nestjs/common';

import { MailerModule as TraxionMailerModule } from '@trxn/nestjs-mailer';

@Module({
  imports: [
    TraxionMailerModule.registerAsync({
      useFactory: () => ({
        privateApiKey: 'test',
        publicApiKey: 'test',
      }),
    }),
  ],
  exports: [TraxionMailerModule],
})
export class MailerModule {}
