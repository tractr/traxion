import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';

import { Public } from '@tractr/nestjs-core';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello')
  @Public()
  getData(): { message: string } {
    return { message: this.appService.getData() };
  }
}
