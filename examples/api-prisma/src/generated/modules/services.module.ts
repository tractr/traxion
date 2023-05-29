import { Module } from '@nestjs/common';

import { DatabaseModule } from './database.module';
import { ModelsServicesModule } from '../nestjs-services';

@Module({
  imports: [
    ModelsServicesModule.register({
      imports: [DatabaseModule],
    }),
  ],
  exports: [ModelsServicesModule],
})
export class NestjsServicesModule {}
