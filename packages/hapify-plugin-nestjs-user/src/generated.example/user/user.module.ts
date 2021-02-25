import { Module } from '@nestjs/common';

import { DatabaseModule } from '../../core/database';
import { ModuleOverride } from '../common/helpers/base-module.helper';
import { UserRestModule } from './rest';

@Module({
  imports: [DatabaseModule],
})
export class UserModule extends ModuleOverride {
  static dependencies: Array<typeof ModuleOverride> = [
    UserRestModule,
    UserModule,
  ];
}
