import { Controller, Get } from '@nestjs/common';

import { Public } from '@tractr/nestjs-core';

@Controller()
export class AuthenticationEndpointMockController {
  @Public()
  @Get('/is-public')
  isPublic(): string {
    return 'hello world';
  }

  @Get('/is-private')
  isPrivate(): string {
    return 'never';
  }
}
