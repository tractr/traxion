import { Inject, Injectable, Logger } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';

import { MODULE_OPTIONS_TOKEN } from '../authentication.module-definition';
import { AuthenticationModuleOptions } from '../interfaces';

import { LoggerService } from '@tractr/nestjs-core';

@Injectable()
export class UserAuthenticationService {
  constructor(
    @Inject(MODULE_OPTIONS_TOKEN)
    private readonly passwordConfig: AuthenticationModuleOptions,
    @Inject(Logger) private readonly logger: LoggerService,
  ) {
    logger.setContext(UserAuthenticationService.name);
  }

  private get userService() {
    if (!this.passwordConfig.userService)
      throw new Error('User service not configured');

    return this.passwordConfig.userService;
  }

  private get fields() {
    return {
      id: 'id',
      login: 'email',
      password: 'password',
      ...(this.passwordConfig.user?.fields || {}),
    };
  }

  async getUserFromLogin(login: string): Promise<User | null> {
    this.logger.debug(`Getting user from login ${login}`);
    const user = await this.userService.findUnique({
      where: {
        [this.fields.login]: login,
      },
    });

    return user;
  }

  async getPasswordFromUser(user: User): Promise<string | null> {
    this.logger.debug(`Getting user from id ${user.id}`);
    const password = (await this.userService.findUnique({
      where: {
        [this.fields.id]: user.id,
      },
      select: {
        [this.fields.password]: true,
      },
    })) as {
      password: string | null;
    } | null;

    return password ? password[this.fields.password as 'password'] : null;
  }

  async getUserFromId<T extends Prisma.UserSelect>(
    id: string | number,
    select?: T,
  ) {
    this.logger.debug(`Getting user from id ${id}`);
    const user = await this.userService.findUnique<{
      where: Prisma.UserWhereUniqueInput;
      select: T | undefined;
    }>({
      where: {
        [this.fields.id]: id,
      },
      select,
    });

    return user;
  }
}
