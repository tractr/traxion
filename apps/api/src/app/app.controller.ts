import { Controller, Get } from '@nestjs/common';
import { User } from '@prisma/client';

import { AppService } from './app.service';

import { CurrentUser } from '@tractr/nestjs-authentication';
import { CaslAbilityFactoryService } from '@tractr/nestjs-casl';
import { Public } from '@tractr/nestjs-core';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly caslAbilityFactoryService: CaslAbilityFactoryService,
  ) {}

  @Get('hello')
  @Public()
  getData(): { message: string } {
    return { message: this.appService.getData() };
  }

  @Get('test')
  testRolePermission(@CurrentUser() user: User) {
    const adminAbility = this.caslAbilityFactoryService.createForUser(user);

    console.log('test adminAbility');
    console.log(adminAbility.can('create', 'User'));
    console.log(adminAbility.can('read', 'User'));
    console.log(adminAbility.can('update', 'User'));
    console.log(adminAbility.can('remove', 'User'));
    console.log(adminAbility.can('delete', 'User'));
    console.log(adminAbility.can('search', 'User'));

    console.log('test ability for an admin');

    const ability = this.caslAbilityFactoryService.createForUser({
      ...user,
      roles: [],
    });

    console.log('test ability');
    console.log(ability.can('create', 'User'));
    console.log(ability.can('read', 'User'));
    console.log(ability.can('update', 'User'));
    console.log(ability.can('remove', 'User'));
    console.log(ability.can('delete', 'User'));
    console.log(ability.can('search', 'User'));

    console.log('test ability for an admin');

    return true;
  }
}
