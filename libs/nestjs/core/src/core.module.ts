import { Module, OnModuleInit } from '@nestjs/common';

import { Logger } from './services';

@Module({
  providers: [Logger],
  exports: [Logger],
})
export class CoreModule implements OnModuleInit {
  onModuleInit(): void {
    // eslint-disable-next-line no-console
    console.info(`This module is deprecated, please use LoggerModule instead.`);
  }
}
