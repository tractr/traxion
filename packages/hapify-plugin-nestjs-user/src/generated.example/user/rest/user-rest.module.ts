import { Module } from '@nestjs/common';

import { DatabaseModule } from '../../../core/database';
import { UserRestDtoService } from './services';
import { UserController } from './controllers';
import { ModuleOverride } from '../../common/helpers/base-module.helper';
import { UserModelModule } from '../common';

@Module({
  imports: [DatabaseModule],
  exports: [UserRestDtoService],
  providers: [UserRestDtoService],
  controllers: [UserController],
})
export class UserRestModule extends ModuleOverride {
  static dependencies = [UserModelModule];
}
