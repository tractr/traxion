import { Logger, Module } from '@nestjs/common';

import { LoggerService } from './services';

@Module({
  providers: [{ provide: Logger, useClass: LoggerService }],
  exports: [{ provide: Logger, useClass: LoggerService }],
})
export class LoggerModule {}
