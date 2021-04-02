import { Module } from '@nestjs/common';

import { Logger } from './services';

@Module({
  providers: [Logger],
  exports: [Logger],
})
export class LoggerModule {}
