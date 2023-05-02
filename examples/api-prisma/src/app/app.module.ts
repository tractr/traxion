import { Module } from '@nestjs/common';

import {
  AuthenticationModule,
  DatabaseModule,
  NestjsServicesModule,
} from './modules';
import { NestjsGQLModule } from './modules/graphql.module';

@Module({
  imports: [
    DatabaseModule,

    AuthenticationModule,

    NestjsServicesModule,

    NestjsGQLModule,
  ],
})
export class AppModule {}
