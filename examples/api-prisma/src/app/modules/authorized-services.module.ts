import { Module } from '@nestjs/common';

import { DatabaseModule } from './database.module';
import { NestjsServicesModule } from './services.module';
import { AuthorizedServicesModule } from '../../nestjs-authorized-services';

@Module({
  imports: [
    AuthorizedServicesModule.register({
      imports: [DatabaseModule, NestjsServicesModule],
    }),
  ],
  exports: [AuthorizedServicesModule],
})
export class NestjsAuthorizedServicesModule {}
