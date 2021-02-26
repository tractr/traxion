import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { CoreModule } from '@tractr/hapify-plugin-nestjs-core';
import { DatabaseModule } from '@tractr/hapify-plugin-nestjs-database';
import {
  AuthenticationModule,
  JwtAuthGuard,
} from '@tractr/hapify-plugin-nestjs-user';
import { USER_CONTROLLER } from '@tractr/hapify-plugin-nestjs-user/lib/src/generated/user';

import { AppController, UserCustomController } from './controllers';
import { ModelsModule, USER_SERVICE } from './generated';
import { UserCustomService } from './services';

const overrides = {
  providers: [{ provide: USER_SERVICE, useClass: UserCustomService }],
};

@Module({
  imports: [
    CoreModule,
    DatabaseModule,
    ModelsModule.register({
      ...overrides,

      controllers: [
        { provide: USER_CONTROLLER, useClass: UserCustomController },
      ],
    }),
    // AuthenticationModule.register(undefined, overrides),
  ],
  controllers: [AppController],
  // providers: [{ provide: APP_GUARD, useClass: JwtAuthGuard }],
})
export class AppModule {}
