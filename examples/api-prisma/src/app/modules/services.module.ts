import { Module } from '@nestjs/common';

import { DatabaseModule } from './database.module';
import { ModelsServicesModules } from '../../nestjs-services';

@Module({
  imports: [
    ModelsServicesModules.register({
      imports: [DatabaseModule],
    }),
  ],
  exports: [ModelsServicesModules],
})
export class NestjsServicesModule {}
