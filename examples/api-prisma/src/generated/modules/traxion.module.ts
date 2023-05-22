import { Module } from '@nestjs/common';

import { AuthenticationModule } from './authentication.module';
import { DatabaseModule } from './database.module';
import { GraphqlModule } from './graphql.module';

@Module({
  imports: [GraphqlModule, AuthenticationModule, DatabaseModule],
  exports: [GraphqlModule, AuthenticationModule, DatabaseModule],
})
export class TraxionModule {}
