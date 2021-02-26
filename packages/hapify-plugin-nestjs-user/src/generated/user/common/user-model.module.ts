import { Module } from '@nestjs/common';
import { ModuleOverride } from '@tractr/hapify-plugin-nestjs-core';

import { UserDatabaseService, UserService } from './services';
import { USER_DATABASE_SERVICE, USER_SERVICE } from './user-model.constant';

const providers = [
  {
    provide: USER_SERVICE,
    useClass: UserService,
  },
  {
    provide: USER_DATABASE_SERVICE,
    useClass: UserDatabaseService,
  },
];

@Module({
  exports: providers,
  providers,
})
export class UserModelModule extends ModuleOverride {}
