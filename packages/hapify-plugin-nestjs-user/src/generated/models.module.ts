import { Module } from '@nestjs/common';
import { ModuleOverride } from '@tractr/hapify-plugin-nestjs-core';
import { UserModule } from './user';

@Module({})
export class ModelsModule extends ModuleOverride {
  static dependencies = [
    UserModule,
  ];
}
