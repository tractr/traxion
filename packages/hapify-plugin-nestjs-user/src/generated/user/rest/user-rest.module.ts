import { Module } from '@nestjs/common';
import { ModuleOverride } from '@tractr/hapify-plugin-nestjs-core';
import { DatabaseModule } from '@tractr/hapify-plugin-nestjs-database';
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
