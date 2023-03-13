import { Module } from '@nestjs/common';

import {
  AuthenticationModule,
  DatabaseModule,
  NestjsServicesModule,
} from './modules';
import { NestjsGraphqlModule } from './modules/graphql.module';

@Module({
  imports: [
    DatabaseModule,

    AuthenticationModule,

    NestjsServicesModule,

    NestjsGraphqlModule,
  ],
})
export class AppModule {}
