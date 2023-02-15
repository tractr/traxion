import { Module } from '@nestjs/common';

import { ModelsServicesModule } from './models-services.module';

import { ModelsRestModule as RestModule } from '@trxn/generated-nestjs-models-rest';

@Module({
  imports: [
    RestModule.register({
      imports: [ModelsServicesModule],
    }),
  ],
  exports: [RestModule],
})
export class ModelsRestModule {}
