import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { User } from '@generated/models';
import { ModelsModule } from '@generated/nestjs-models';
import {
  AuthenticationModule,
  JwtGlobalAuthGuard,
} from '@tractr/nestjs-authentication';
import { DatabaseModule } from '@tractr/nestjs-database';

// test
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
  ],
  controllers: [AppController],
  providers: [AppService, { provide: APP_GUARD, useClass: JwtGlobalAuthGuard }],
})
export class AppModule {}
