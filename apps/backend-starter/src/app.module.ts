import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import {
  AuthenticationModule,
  JwtAuthGuard,
} from '@tractr/nestjs-authentication';
import { CoreModule } from '@tractr/nestjs-core';
import { DatabaseModule } from '@tractr/nestjs-database';

import { AppController, UserCustomController } from './controllers';
import { ModelsModule, USER_SERVICE } from './generated';
import { UserCustomService } from './services';

@Module({
  imports: [
    CoreModule,
    DatabaseModule,
    ModelsModule.register(),
    // AuthenticationModule.register(undefined, overrides),
  ],
  controllers: [AppController],
  // providers: [{ provide: APP_GUARD, useClass: JwtAuthGuard }],
})
export class AppModule {}
