import { Module } from '@nestjs/common';
import {
  APP_FILTER,
  // APP_GUARD
} from '@nestjs/core';
import // AuthenticationModule,
//   JwtAuthGuard,
'@tractr/nestjs-authentication';
import { CoreModule, PrismaExceptionFilter } from '@tractr/nestjs-core';
import { DatabaseModule } from '@tractr/nestjs-database';

import {
  AppController,
  // UserCustomController
} from './controllers';
import {
  ModelsModule,
  // USER_SERVICE
} from './generated';
// import { UserCustomService } from './services';

@Module({
  imports: [
    CoreModule,
    DatabaseModule,
    ModelsModule.register(),
    // AuthenticationModule.register(),
  ],
  controllers: [AppController],
  providers: [
    { provide: APP_FILTER, useClass: PrismaExceptionFilter },
    // { provide: APP_GUARD, useClass: JwtAuthGuard }
  ],
})
export class AppModule {}
