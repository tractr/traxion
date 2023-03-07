import { Module, Scope } from '@nestjs/common';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ConsoleModule } from 'nestjs-console';

import {
  AuthenticationModule,
  CaslModule,
  DatabaseModule,
  FileStorageModule,
  GraphQLModule,
  MailerModule,
  ModelsModule,
  PasswordModule,
} from './modules';

import { JwtGlobalAuthGuard } from '@trxn/nestjs-authentication';
import { CaslExceptionInterceptor, PoliciesGuard } from '@trxn/nestjs-casl';
import { LoggerModule } from '@trxn/nestjs-core';

@Module({
  imports: [
    // Internal database services
    DatabaseModule,

    // API modules
    ModelsModule,
    GraphQLModule,

    // Authentication modules
    CaslModule,
    AuthenticationModule,
    PasswordModule,

    // Miscellaneous
    MailerModule,
    FileStorageModule,

    // Logger
    LoggerModule,

    // Cli
    ConsoleModule,
  ],

  providers: [
    { provide: APP_GUARD, useClass: JwtGlobalAuthGuard, scope: Scope.REQUEST },
    { provide: APP_GUARD, useClass: PoliciesGuard },
    { provide: APP_INTERCEPTOR, useClass: CaslExceptionInterceptor },
  ],
})
export class AppModule {}
