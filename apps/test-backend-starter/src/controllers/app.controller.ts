import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('')
  public helloWorld(): string {
    return 'Hello World! App is alive';
  }
}
