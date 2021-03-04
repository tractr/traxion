import { Module } from '@nestjs/common';
import { ModuleOverride } from '@tractr/nestjs-core';

import { UserModelModule } from './common';
import { UserRestModule } from './rest';

@Module({})
export class UserModule extends ModuleOverride {
  static dependencies: Array<typeof ModuleOverride> = [
    UserRestModule,
    UserModelModule,
  ];
}
