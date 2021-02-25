import { Module } from '@nestjs/common';
import { ModuleOverride } from '@tractr/hapify-plugin-nestjs-core';
import { DatabaseModule } from '@tractr/hapify-plugin-nestjs-database';
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
