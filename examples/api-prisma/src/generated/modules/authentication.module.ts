import { Module } from '@nestjs/common';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';

import {
  customSelect,
  getRoles,
  publicPermissions,
  rolePermissions,
} from './configs/casl.config';
import { LoginResolver } from './resolvers';
import { NestjsServicesModule } from './services.module';
import { UserModule } from './user.module';

import {
  JwtGlobalAuthGuard,
  AuthenticationModule as TrxnAuthenticationModule,
} from '@trxn/nestjs-authentication';
import {
  CaslExceptionInterceptor,
  CaslModule,
  PoliciesGuard,
} from '@trxn/nestjs-casl';

@Module({
  imports: [
    NestjsServicesModule,
    TrxnAuthenticationModule.register({
      imports: [UserModule],
      customSelect,
      jwtModuleOptions: {
        secret: process.env.JWT_SECRET || 'secret',
      },
    }),
    CaslModule.register({
      getRoles,
      rolePermissions,
      publicPermissions,
    }),
  ],
  exports: [TrxnAuthenticationModule],
  providers: [
    LoginResolver,
    { provide: APP_GUARD, useClass: JwtGlobalAuthGuard },
    { provide: APP_GUARD, useClass: PoliciesGuard },
    { provide: APP_INTERCEPTOR, useClass: CaslExceptionInterceptor },
  ],
})
export class AuthenticationModule {}
