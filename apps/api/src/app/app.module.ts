import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import { AppController } from './app.controller';
import { AppService } from './app.service';

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
    AuthenticationModule.register(),
  ],
  controllers: [AppController],
  providers: [AppService, { provide: APP_GUARD, useClass: JwtGlobalAuthGuard }],
})
export class AppModule {}
