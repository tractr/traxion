import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { CoreModule } from '@tractr/hapify-plugin-nestjs-core';
import { DatabaseModule } from '@tractr/hapify-plugin-nestjs-database';
import {
  AuthenticationModule,
  JwtAuthGuard,
} from '@tractr/hapify-plugin-nestjs-user';

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
