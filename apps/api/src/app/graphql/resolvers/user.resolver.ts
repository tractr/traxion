import { Inject } from '@nestjs/common';
import { Args, ID, Query, Resolver } from '@nestjs/graphql';

import { User } from '../object-types/user.model';

import {
  USER_SERVICE,
  UserService,
} from '@tractr/generated-nestjs-models-common';
import { Public } from '@tractr/nestjs-core';

@Resolver(() => User)
export class UserResolver {
  constructor(
    @Inject(USER_SERVICE) private readonly usersService: UserService,
  ) {}

  @Query(() => [User])
  @Public()
  async users() {
    console.log(await this.usersService.findMany());
    return this.usersService.findMany();
  }

  @Query(() => User)
  async user(@Args('id', { type: () => ID }) id: string) {
    return this.usersService.findUnique({ where: { id } });
  }
}
