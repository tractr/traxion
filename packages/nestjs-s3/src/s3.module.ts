import { Global, Module } from '@nestjs/common';
import { LoggerModule, ModuleOptionsHelper } from '@tractr/nestjs-core';

import { S3_CONFIG } from './config';
import { S3_MODULE_CONFIG } from './constants';
import { S3Config } from './interfaces';
import { S3Service } from './services';

@Global()
@Module({
  imports: [LoggerModule],
  providers: [S3Service],
  exports: [S3Service],
})
export class DatabaseModule extends ModuleOptionsHelper<S3Config>(
  S3_MODULE_CONFIG,
  S3_CONFIG,
) {}
