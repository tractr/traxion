import { Controller, Get, Inject, Logger } from '@nestjs/common';

import { AppService } from './app.service';

import { LoggerService, Public } from '@tractr/nestjs-core';

@Controller('test')
export class AppController {
  constructor(
    @Inject(Logger) private readonly logger: LoggerService,
    private readonly appService: AppService,
  ) {
    logger.setContext('AppController');
    // logger.setMetadata({ userId: '123' });
  }

  @Get()
  @Public()
  public getTest() {
    this.logger.log('before appService', 'test');
    this.appService.getHello();
    this.logger.log(
      { message: 'after appService', test: '456' },
      { context: 'AppControllerOverride', test: '789' },
    );
    this.logger.verbose('verbose');
    this.logger.log({ message: 'test' });
    return 'test';
  }
}
