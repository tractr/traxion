import { Module } from '@nestjs/common';
import { PrismaModule } from './database.module';
import { ModelsServicesModules } from './nestjs-services';

@Module({
  imports: [
    ModelsServicesModules.register({
      imports: [PrismaModule],
    }),
  ],
  exports: [ModelsServicesModules],
})
export class ServicesModule {}
