import { Global, Module } from '@nestjs/common';
import { LoggerModule } from '@tractr/nestjs-core';

@Global()
@Module({
  imports: [LoggerModule],
  exports: [LoggerModule],
})
export class NestjsLoggerModule {}
