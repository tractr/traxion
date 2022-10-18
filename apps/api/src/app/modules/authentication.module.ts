import { Module } from '@nestjs/common';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';

import { CaslModule } from './casl.module';
import { EncryptionModule } from './encryption.module';
import { ModelsModule } from './models.module';

import { getSelectPrismaUserQuery } from '@tractr/generated-casl';
import { USER_SERVICE } from '@tractr/generated-nestjs-models-common';
import {
  JwtGlobalAuthGuard,
  AuthenticationModule as TraxionAuthenticationModule,
} from '@tractr/nestjs-authentication';
import { BcryptService } from '@tractr/nestjs-bcrypt';
import { CaslExceptionInterceptor, PoliciesGuard } from '@tractr/nestjs-casl';

@Module({
  imports: [
    CaslModule,
    TraxionAuthenticationModule.registerAsync({
      imports: [ModelsModule, EncryptionModule],
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
