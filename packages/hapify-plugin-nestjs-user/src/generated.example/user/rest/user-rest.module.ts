import { Module } from '@nestjs/common';

import { DatabaseModule } from '../../../core/database';
import { ModuleOverride } from '../../common/helpers/base-module.helper';
import { UserModelModule } from '../common';
import { UserController } from './controllers';
import { UserRestDtoService } from './services';

@Module({
  imports: [DatabaseModule],
  exports: [UserRestDtoService],
  providers: [UserRestDtoService],
  controllers: [UserController],
})
export class UserRestModule extends ModuleOverride {
  static dependencies = [UserModelModule];
}
