import { Module } from '@nestjs/common';
import { ModuleOverride } from '@tractr/nestjs-core';

import { USER_DATABASE_SERVICE, USER_SERVICE } from './user-model.constant';
import {
  userDatabaseServiceFactory,
  userDatabaseServiceInject,
  UserService
} from './services';

const providers = [
  {
    provide: USER_SERVICE,
    useClass: UserService,
  },
  {
    provide: USER_DATABASE_SERVICE,
    useFactory: userDatabaseServiceFactory,
    inject: userDatabaseServiceInject
  },
];

@Module({
  exports: providers,
  providers,
})
export class UserModelModule extends ModuleOverride {}

