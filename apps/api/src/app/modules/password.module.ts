import { Module } from '@nestjs/common';

import { EncryptionModule } from './encryption.module';
import { MailerModule } from './mailer.module';
import { UserModule } from './user.module';

import { BcryptService } from '@trxn/nestjs-bcrypt';
import {
  ENCRYPTION_SERVICE,
  PasswordModule as TraxionPasswordModule,
} from '@trxn/nestjs-password';
import { ResetPasswordModule } from '@trxn/nestjs-reset-password';

@Module({
  imports: [
    TraxionPasswordModule.register({
      imports: [UserModule, EncryptionModule],
      providers: [{ provide: ENCRYPTION_SERVICE, useExisting: BcryptService }],
    }),
    ResetPasswordModule.register({
      imports: [UserModule, MailerModule],
      from: 'admin@traxion.com',
    }),
  ],
  exports: [TraxionPasswordModule],
})
export class PasswordModule {}
