import { Module } from '@nestjs/common';

import {
  AuthenticationModule,
  DatabaseModule,
  NestjsServicesModule,
} from './modules';

@Module({
  imports: [
    DatabaseModule,

    AuthenticationModule,

    NestjsServicesModule,

    // Graphql modules
  ],
})
export class AppModule {}
