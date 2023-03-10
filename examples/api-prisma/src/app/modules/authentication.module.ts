import { Module } from '@nestjs/common';

import { UserModule } from './user.module';

import { AuthenticationModule as TrxnAuthenticationModule } from '@trxn/nestjs-authentication';

@Module({
  imports: [
    TrxnAuthenticationModule.register({
      imports: [UserModule],
      jwtModuleOptions: {
        secret: 'secret',
      },
    }),
  ],
  exports: [TrxnAuthenticationModule],
})
export class AuthenticationModule {}
