import { Module } from '@nestjs/common';

import { MailerModule as TraxionMailerModule } from '@trxn/nestjs-mailer';
import { MailjetModule, MailjetService } from '@trxn/nestjs-mailjet';

@Module({
  imports: [
    TraxionMailerModule.register({
      imports: [
        MailjetModule.register({
          apiKey: process.env.MAILJET_API_KEY,
          apiSecret: process.env.MAILJET_API_SECRET,
        }),
      ],
      MailerClient: MailjetService,
    }),
  ],
  exports: [TraxionMailerModule],
})
export class MailerModule {}
