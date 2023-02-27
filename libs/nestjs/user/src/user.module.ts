import { Module } from '@nestjs/common';

import { UserService } from './services';
import { ConfigurableModuleClass } from './user.module-definition';

import { LoggerModule } from '@trxn/nestjs-core';

@Module({
  imports: [LoggerModule],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule extends ConfigurableModuleClass {}
