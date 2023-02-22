/* istanbul ignore file */
import { AbilityBuilder, ForbiddenError, PureAbility } from '@casl/ability';
import { createPrismaAbility, PrismaQuery, Subjects } from '@casl/prisma';
import { Controller, Get } from '@nestjs/common';

import { Public } from '@trxn/nestjs-core';
import { User } from '@trxn/nestjs-user';

@Controller()
export class CaslExceptionEndpointMockController {
  private readonly ERROR_MESSAGE = 'This is an example error message';

  private readonly ERROR_CLIENT_VERSION = '1.0.0';

  @Public()
  @Get('/casl-forbidden-error')
  caslForbiddenError() {
    type AppAbility = PureAbility<
      [
        string,
        Subjects<{
          User: User;
        }>,
      ],
      PrismaQuery
    >;
    const builder = new AbilityBuilder<AppAbility>(createPrismaAbility);
    const ability = builder.build();
    ForbiddenError.from(ability).throwUnlessCan('read', 'User');
  }

  @Public()
  @Get('/default-error')
  defaultError(): Error {
    throw new Error(this.ERROR_MESSAGE);
  }
}
