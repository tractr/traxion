import { Ability, ForbiddenError } from '@casl/ability';
import { Controller, Get } from '@nestjs/common';

import { Public } from '@tractr/nestjs-core';

type Abilities = ['read', 'User'];

@Controller()
export class CaslExceptionEndpointMockController {
  private readonly ERROR_MESSAGE = 'This is an example error message';

  private readonly ERROR_CLIENT_VERSION = '1.0.0';

  @Public()
  @Get('/casl-forbidden-error')
  caslForbiddenError() {
    const ability = new Ability<Abilities>();
    ForbiddenError.from(ability).throwUnlessCan('read', 'User');
  }

  @Public()
  @Get('/default-error')
  defaultError(): Error {
    throw new Error(this.ERROR_MESSAGE);
  }
}
