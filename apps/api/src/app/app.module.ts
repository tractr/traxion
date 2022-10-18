import { Module } from '@nestjs/common';
import { ConsoleModule } from 'nestjs-console';

import {
  AuthenticationModule,
  DatabaseModule,
  FileStorageModule,
  GraphQLModule,
  MailerModule,
  ModelsModule,
  PasswordModule,
} from './modules';

import { LoggerModule } from '@tractr/nestjs-core';

@Module({
  imports: [
    // Internal database services
    DatabaseModule,

    // API modules
    ModelsModule,
    GraphQLModule,

    // Authentication modules
    AuthenticationModule,
    PasswordModule,

    // Miscellaneous
    MailerModule,
    FileStorageModule,

    // Logger
    LoggerModule,

    // Cli
    ConsoleModule,
  ],
})
export class AppModule {}
