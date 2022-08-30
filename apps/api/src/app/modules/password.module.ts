import { Module } from '@nestjs/common';

import { EncryptionModule } from './encryption.module';
import { MailerModule } from './mailer.module';
import { ModelsModule } from './models.module';

import { USER_SERVICE } from '@tractr/generated-nestjs-models-common';
import { BcryptService, EncryptionService } from '@tractr/nestjs-bcrypt';
import { ResetPasswordSendEmailService } from '@tractr/nestjs-mailer';
import { PasswordModule as TraxionPasswordModule } from '@tractr/nestjs-password';

@Module({
  imports: [
    TraxionPasswordModule.registerAsync({
      imports: [ModelsModule, MailerModule, EncryptionModule],
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
