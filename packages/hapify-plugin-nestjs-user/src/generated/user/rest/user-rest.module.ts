import { Module } from '@nestjs/common';
import { ModuleOverride } from '@tractr/hapify-plugin-nestjs-core';

import { UserModelModule } from '../common';
import { UserController } from './controllers';
import { UserRestDtoService } from './services';
import { USER_CONTROLLER, USER_REST_DTO_SERVICE } from './user-rest.constant';

const providers = [
  {
    provide: USER_REST_DTO_SERVICE,
    useClass: UserRestDtoService,
  },
];

@Module({
  exports: providers,
  providers,
})
export class UserRestModule extends ModuleOverride {
  static controllers = [
    {
      provide: USER_CONTROLLER,
      useClass: UserController,
    },
  ];

  static dependencies = [UserModelModule];
}
