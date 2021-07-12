import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ConsoleModule } from 'nestjs-console';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CliModule } from './cli/cli.module';

import { rolePermissions } from '@generated/casl';
import { User } from '@generated/models';
import { ModelsModule } from '@generated/nestjs-models';
import {
  AuthenticationModule,
  JwtGlobalAuthGuard,
} from '@tractr/nestjs-authentication';
import { CaslModule } from '@tractr/nestjs-casl';
import { DatabaseModule } from '@tractr/nestjs-database';
import { MailerModule } from '@tractr/nestjs-mailer';

@Module({
  imports: [
    ModelsModule.register(),
    DatabaseModule.register(),
    AuthenticationModule.registerAsync({
      useFactory: (defaultOptions) => ({
        ...defaultOptions,
        api: {
          url: '/api',
        },
        user: User,
      }),
    }),
    MailerModule.registerAsync({
      useFactory: () => ({
        privateApiKey: 'test',
        publicApiKey: 'test',
      }),
    }),
    CaslModule.register({
      rolePermissions,
    }),
    ConsoleModule,
    CliModule,
  ],
  controllers: [AppController],
  providers: [AppService, { provide: APP_GUARD, useClass: JwtGlobalAuthGuard }],
})
export class AppModule {}
