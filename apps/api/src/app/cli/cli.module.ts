import { Module } from '@nestjs/common';

import { UserPasswordCli } from './user-password.cli';

import { ModelsModule } from '@generated/nestjs-models';
import { DatabaseModule } from '@tractr/nestjs-database';

// test
@Module({
  imports: [ModelsModule.register(), DatabaseModule.register()],
  controllers: [],
  providers: [UserPasswordCli],
})
export class CliModule {}
