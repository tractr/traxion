import { Inject, Injectable, Logger } from '@nestjs/common';

import { PasswordModuleOptions, UserInfo } from '../interfaces';
import { MODULE_OPTIONS_TOKEN } from '../password.module-definition';

import { LoggerService } from '@trxn/nestjs-core';

@Injectable()
export class UserPasswordService {
  constructor(
    @Inject(MODULE_OPTIONS_TOKEN)
    private readonly passwordConfig: PasswordModuleOptions,
    @Inject(Logger) private readonly logger: LoggerService,
  ) {
    logger.setContext(UserPasswordService.name);
  }

  private get userService() {
    return this.passwordConfig.userService;
  }

  private get fields() {
    return {
      id: 'id',
      email: 'email',
      password: 'password',
      ...(this.passwordConfig.user?.fields || {}),
    };
  }

  getUserFromUserInfo(user: UserInfo) {
    return {
      [this.fields.id]: user.id,
      [this.fields.email]: user.email,
      [this.fields.password]: user.password,
    };
  }

  checkUserInfo(user: UserInfo | null): UserInfo | null {
    if (!user) {
      this.logger.debug(`User not found`);
      return null;
    }

    const { id, email, password } = {
      id: user[this.fields.id as 'id'],
      email: user[this.fields.email as 'email'],
      password: user[this.fields.password as 'password'],
    };

    if (!id || !password || !email) {
      this.logger.debug(`id, password or email information not found`, user);
      return null;
    }

    return { id, email, password };
  }

  async getUserFromLogin(login: string): Promise<UserInfo | null> {
    this.logger.debug(`Getting user from login ${login}`);
    const user = (await this.userService.findUnique({
      where: {
        [this.fields.email]: login,
      },
      select: {
        [this.fields.id]: true,
        [this.fields.email]: true,
        [this.fields.password]: true,
      },
    })) as UserInfo | null;

    return this.checkUserInfo(user);
  }

  async getUserFromId(userId: string | number): Promise<UserInfo | null> {
    this.logger.debug(`Getting user from id ${userId}`);
    const user = (await this.userService.findUnique({
      where: {
        [this.fields.id]: userId,
      },
      select: {
        [this.fields.id]: true,
        [this.fields.email]: true,
        [this.fields.password]: true,
      },
    })) as UserInfo | null;

    return this.checkUserInfo(user);
  }

  updateUserPassword(userId: string | number, newPassword: string) {
    this.logger.debug(`Updating user password for id ${userId}`);
    return this.userService.update({
      where: {
        [this.fields.id]: userId,
      },
      data: {
        [this.fields.password]: newPassword,
      },
    });
  }
}
