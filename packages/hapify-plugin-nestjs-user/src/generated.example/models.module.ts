import { Module } from '@nestjs/common';

import { ModuleOverride } from './common/helpers/base-module.helper';
import { UserModule } from './user';

@Module({})
export class ModelsModule extends ModuleOverride {
  static dependencies = [UserModule];
}
