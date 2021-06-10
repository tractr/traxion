import { Controller, Get } from '@nestjs/common';

@Controller()
export class AuthenticationEndpointMockController {
  @Get('/not-authenticated')
  neverAccess(): string {
    return 'hello world';
  }
}
