import { Injectable, Inject } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { UserService, USER_SERVICE } from '../../nestjs-services';
import { AppAbility } from '../../casl-target';

@Injectable()
export class UserAuthorizedService {
  constructor(
    @Inject(USER_SERVICE) private readonly userService: UserService,
  ) {}

  async findUnique<T extends Prisma.UserFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.UserFindUniqueArgs>,
    abilities: AppAbility,
  ) {
    return this.userService.findUnique<T>(args);
  }

  async findMany<T extends Prisma.UserFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.UserFindManyArgs>,
    abilities: AppAbility,
  ) {
    return this.userService.findMany<T>(args);
  }

  async create<T extends Prisma.UserCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.UserCreateArgs>,
    abilities: AppAbility,
  ) {
    return this.userService.create<T>(args);
  }

  async update<T extends Prisma.UserUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.UserUpdateArgs>,
    abilities: AppAbility,
  ) {
    return this.userService.findUnique<T>(args);
  }

  async delete<T extends Prisma.UserDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.UserDeleteArgs>,
    abilities: AppAbility,
  ) {
    return this.userService.delete<T>(args);
  }

  async count<T extends Prisma.UserCountArgs>(
    args: Prisma.SelectSubset<T, Prisma.UserCountArgs>,
    abilities: AppAbility,
  ) {
    return this.userService.count<T>(args);
  }
}
