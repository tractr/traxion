import { Controller, Get, Post } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('')
  public helloWorld(): string {
    return 'Hello World! App is alive';
  }

  @Post('error')
  public throwError() {
    throw new Error();
  }
}
