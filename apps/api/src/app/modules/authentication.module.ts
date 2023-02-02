import { Module } from '@nestjs/common';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';

import { CaslModule } from './casl.module';
import { EncryptionModule } from './encryption.module';
import { ModelsServicesModule } from './models-services.module';

import { getSelectPrismaUserQuery } from '@trxn/generated-casl';
import { USER_SERVICE } from '@trxn/generated-nestjs-models-common';
import {
  JwtGlobalAuthGuard,
  AuthenticationModule as TraxionAuthenticationModule,
} from '@trxn/nestjs-authentication';
import { BcryptService } from '@trxn/nestjs-bcrypt';
import { CaslExceptionInterceptor, PoliciesGuard } from '@trxn/nestjs-casl';

@Module({
  imports: [
    CaslModule,
    TraxionAuthenticationModule.registerAsync({
      imports: [ModelsServicesModule, EncryptionModule],
      useFactory: (userService, encryptionService) => ({
        user: {
          customSelect: getSelectPrismaUserQuery(),
        },
        jwtModuleOptions: {
          secret: 'secret',
        },
        userService,
        encryptionService,
      }),
      inject: [USER_SERVICE, BcryptService],
    }),
  ],
  providers: [
    { provide: APP_GUARD, useClass: JwtGlobalAuthGuard },
    { provide: APP_GUARD, useClass: PoliciesGuard },
    { provide: APP_INTERCEPTOR, useClass: CaslExceptionInterceptor },
  ],
  exports: [TraxionAuthenticationModule],
})
export class AuthenticationModule {}
