import { Module } from '@nestjs/common';
import { CoreModule } from '@tractr/hapify-plugin-nestjs-core';
import { DatabaseModule } from '@tractr/hapify-plugin-nestjs-database';
import { AuthenticationModule } from '@tractr/hapify-plugin-nestjs-user';
import { UserService } from '@tractr/hapify-plugin-nestjs-user/lib/src/generated/user';

import { AppController } from './controllers';
import { ModelsModule } from './generated';
import { UserCustomService } from './services';

@Module({
  imports: [
    CoreModule,
    DatabaseModule,
    // ModelsModule.register(),
    AuthenticationModule
      .register
      //   undefined, {
      //   providers: [{ provide: USER_SERVICE, useClass: UserCustomService }],
      // }
      (),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
