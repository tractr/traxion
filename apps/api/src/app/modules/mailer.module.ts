import { Module } from '@nestjs/common';

import { MailerModule as DynamicMailerModule } from '@tractr/nestjs-mailer';

@Module({
  imports: [
    DynamicMailerModule.registerAsync({
      useFactory: () => ({
        privateApiKey: 'test',
        publicApiKey: 'test',
      }),
    }),
  ],
})
export class MailerModule {}
