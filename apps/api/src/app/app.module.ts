import { Module } from '@nestjs/common';
import { ConsoleModule } from 'nestjs-console';

import {
  AuthenticationModule,
  DatabaseModule,
  FileStorageModule,
  GraphQLModule,
  MailerModule,
  ModelsRestModule,
  ModelsServicesModule,
  PasswordModule,
} from './modules';

import { LoggerModule } from '@trxn/nestjs-core';

@Module({
  imports: [
    // Internal database services
    // DatabaseModule,
    // API modules
    ModelsServicesModule,
    ModelsRestModule,
    // GraphQLModule,
    // Authentication modules
    // AuthenticationModule,
    // PasswordModule,
    // Miscellaneous
    // MailerModule,
    // FileStorageModule,
    // Logger
    // LoggerModule,
    // Cli
    // ConsoleModule,
  ],
})
export class AppModule {}
