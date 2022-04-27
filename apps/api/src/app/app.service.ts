import { Inject, Injectable, Logger } from '@nestjs/common';

import { LoggerService } from '@tractr/nestjs-core';

@Injectable()
export class AppService {
  constructor(@Inject(Logger) private readonly logger: LoggerService) {
    this.logger.setContext('AppService');
    this.logger.setMetadata({ userId: '123' });
  }

  getHello(): string {
    this.logger.log({
      message: 'Hello World!',
      foo: 'bar',
    });
    return 'Hello World!';
  }
}
