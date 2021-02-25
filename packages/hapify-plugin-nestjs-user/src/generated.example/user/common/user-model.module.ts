import { Module } from '@nestjs/common';
import { ModuleOverride } from '@tractr/hapify-plugin-nestjs-core';
import { DatabaseModule } from '@tractr/hapify-plugin-nestjs-database';

import { UserDatabaseService, UserService } from './services';

@Module({
  imports: [DatabaseModule],
  exports: [UserService, UserDatabaseService],
  providers: [UserService, UserDatabaseService],
})
export class UserModelModule extends ModuleOverride {}
