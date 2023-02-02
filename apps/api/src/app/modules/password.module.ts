import { Module } from '@nestjs/common';

import { EncryptionModule } from './encryption.module';
import { MailerModule } from './mailer.module';
import { ModelsServicesModule } from './models-services.module';

import { USER_SERVICE } from '@trxn/generated-nestjs-models-common';
import { BcryptService, EncryptionService } from '@trxn/nestjs-bcrypt';
import { ResetPasswordSendEmailService } from '@trxn/nestjs-mailer';
import { PasswordModule as TraxionPasswordModule } from '@trxn/nestjs-password';

@Module({
  imports: [
    TraxionPasswordModule.registerAsync({
      imports: [ModelsServicesModule, MailerModule, EncryptionModule],
      useFactory: (
        userService,
        resetPasswordSendEmailService: ResetPasswordSendEmailService,
        encryptionService: EncryptionService,
      ) => ({
        resetPasswordSendEmail: {
          request:
            resetPasswordSendEmailService.sendRequestResetPasswordEmailFactory({
              from: 'admin@traxion.com',
            }),
          updated:
            resetPasswordSendEmailService.sendUpdatedPasswordEmailFactory({
              from: 'admin@traxion.com',
            }),
        },
        userService,
        encryptionService,
      }),
      inject: [USER_SERVICE, ResetPasswordSendEmailService, BcryptService],
    }),
  ],
  exports: [TraxionPasswordModule],
})
export class PasswordModule {}
