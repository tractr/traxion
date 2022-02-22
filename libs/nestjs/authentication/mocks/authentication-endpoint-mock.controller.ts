import { Controller, Get } from '@nestjs/common';
import type { User } from '@prisma/client';

import { CurrentUser } from '../src';

import { Public } from '@tractr/nestjs-core';

@Controller()
export class AuthenticationEndpointMockController {
  @Public()
  @Get('/is-public')
  isPublic(): string {
    return 'hello world';
  }

  @Public()
  @Get('/is-public-with-user')
  isPublicWithUser(@CurrentUser() user: User | null): User | null {
    return user;
  }

  @Get('/is-private')
  isPrivate(): string {
    return 'never';
  }
}
