import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';

import { Public } from '@tractr/nestjs-core';
import { FileStorageService } from '@tractr/nestjs-file-storage';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private fileStorageService: FileStorageService,
  ) {}

  @Get('hello')
  @Public()
  getData(): { message: string } {
    return { message: this.appService.getData() };
  }
}
