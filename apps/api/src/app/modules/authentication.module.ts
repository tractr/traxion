import { Module } from '@nestjs/common';

import { UserModule } from './user.module';

import { getSelectPrismaUserQuery } from '@trxn/generated-casl';
import { AuthenticationModule as TraxionAuthenticationModule } from '@trxn/nestjs-authentication';

@Module({
  imports: [
    TraxionAuthenticationModule.register({
      imports: [UserModule],
      customSelect: getSelectPrismaUserQuery(),
      jwtModuleOptions: {
        secret: 'secret',
      },
    }),
  ],
  exports: [TraxionAuthenticationModule],
})
export class AuthenticationModule {}
