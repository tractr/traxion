import { Module } from '@nestjs/common';

import { ModelsServicesModules } from '../../nestjs-services';
import { DatabaseModule } from './database.module';

@Module({
  imports: [
    ModelsServicesModules.register({
      imports: [DatabaseModule],
    }),
  ],
  exports: [ModelsServicesModules],
})
export class NestjsServicesModule {}
