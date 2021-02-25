import { Module } from '@nestjs/common';

import { AuthenticationModule } from './authentication';
import { AuthenticationModuleOptionsFactory } from './authentication/config/authentication.config';
import { UserCustomService } from './authentication/services/user-customservice';
import { LogModule } from './core';
import { ModelsModule } from './generated.example/models.module';
import { UserService } from './generated.example/user';

@Module({
  imports: [
    LogModule,
    ModelsModule.register({
      providers: [{ provide: UserService, useClass: UserCustomService }],
    }),
    AuthenticationModule.registerAsync(
      {
        useClass: AuthenticationModuleOptionsFactory,
      },
      { providers: [{ provide: UserService, useClass: UserCustomService }] },
    ),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
