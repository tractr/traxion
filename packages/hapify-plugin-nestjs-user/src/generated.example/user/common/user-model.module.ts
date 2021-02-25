import { Module } from '@nestjs/common';

import { DatabaseModule } from '../../../core';
import { ModuleOverride } from '../../common/helpers/base-module.helper';
import { UserDatabaseService, UserService } from './services';

@Module({
  imports: [DatabaseModule],
  exports: [UserService, UserDatabaseService],
  providers: [UserService, UserDatabaseService],
})
export class UserModelModule extends ModuleOverride {}
