import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';

import { AUTHENTICATION_MODULE_OPTIONS } from '../constants';
import { AuthenticationModuleOptions } from '../dtos';
import { UserService as UserServiceInterface } from '../interfaces';

@Injectable()
export class AuthenticationUserService
  implements UserServiceInterface, OnModuleInit
{
  private dynamicUserService!: UserServiceInterface;

  constructor(
    @Inject(AUTHENTICATION_MODULE_OPTIONS)
    private readonly authenticationOptions: AuthenticationModuleOptions,
    private moduleRef: ModuleRef,
  ) {}

  async onModuleInit() {
    const { userService } = this.authenticationOptions;

    if (typeof userService === 'string') {
      this.dynamicUserService = await this.moduleRef.resolve(
        userService,
        undefined,
        {
          strict: false,
        },
      );
    }

    if (!this.dynamicUserService)
      throw new Error('userServiceClass or userServiceToken is not defined');
  }

  async findUnique(args: {
    where: { [key: string]: string | number };
    select?: Record<string, boolean> | undefined;
  }) {
    return this.dynamicUserService.findUnique(args);
  }

  async update(args: {
    where: {
      [key: string]: string | number;
    };
    data: {
      [key: string]: string;
    };
  }) {
    return this.dynamicUserService.update(args);
  }
}
