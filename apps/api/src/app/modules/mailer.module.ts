import { Module } from '@nestjs/common';

import { MailerModule as TraxionMailerModule } from '@trxn/nestjs-mailer';
import { MailjetModule } from '@trxn/nestjs-mailjet';

@Module({
  imports: [
    TraxionMailerModule.register({
      imports: [
        MailjetModule.register({
          apiKey: process.env.MAILJET_API_KEY,
          apiSecret: process.env.MAILJET_API_SECRET,
        }),
      ],
    }),
  ],
  exports: [TraxionMailerModule],
})
export class MailerModule {}
