/* eslint-disable @typescript-eslint/no-explicit-any */
import { ForbiddenError, Subject, subject } from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { inspect } from 'util';

import { AppAbility } from '../../casl/types';
import { UserService } from '../../nestjs-services';
import { ValidateAbilitiesService } from './ownerships.service';
import { SelectService } from './select.service';

import { Action } from '@trxn/nestjs-casl';
import { PrismaService } from '@trxn/nestjs-database';

export type PrismaTransactionService = Omit<
  PrismaService,
  '$on' | '$connect' | '$disconnect' | '$use' | '$transaction'
>;

export function prismaTransaction(prisma: PrismaTransactionService) {
  return <T>(fn: (prisma: PrismaTransactionService) => Promise<T>) =>
    fn(prisma);
}

@Injectable()
export class UserAuthorizationService {
  constructor(
    protected readonly prismaClient: PrismaService,
    protected readonly userService: UserService,
    protected readonly validateAbilities: ValidateAbilitiesService,
    protected readonly selectService: SelectService,
  ) {}

  /**
   *     Find zero or one User that matches the filter.
   *     @param {UserFindUniqueArgs} args - Arguments to find a User
   *     @example
   *     // Get one User
   *     const user = await this.userService.findUnique({
   * where: {
   *  // ... provide filter here
   * }
   *     })
   *
   */
  async findUnique<T extends Prisma.UserFindUniqueArgs>(
    abilities: AppAbility,
    args: Prisma.SelectSubset<T, Prisma.UserFindUniqueArgs>,
    prisma: PrismaService = this.prismaClient,
  ) {
    const userArgs = this.selectService.getUserArgs(abilities, args);

    console.log(inspect({ ...args, ...userArgs }, false, null, true));
    const user = await this.userService.findUnique<T>(
      { ...args, ...userArgs },
      prisma.user,
    );

    ForbiddenError.from(abilities).throwUnlessCan(
      Action.Read,
      subject('User', user),
    );

    return user;
  }

  /**
   * Find the first User that matches the filter.
   * Note, that providing 'undefined' is treated as the value not being there.
   * Read more here: https://pris.ly/d/null-undefined
   * @param {UserFindFirstArgs} args - Arguments to find a User
   * @example
   * // Get one User
   * const user = await this.userService.findFirst({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   *
   */
  async findFirst<T extends Prisma.UserFindFirstArgs>(
    abilities: AppAbility,
    args: Prisma.SelectSubset<T, Prisma.UserFindFirstArgs>,
    prisma: PrismaService = this.prismaClient,
  ) {
    const userArgs = this.selectService.getUserArgs(abilities, args);

    const where = this.selectService.getUserWhereInput(
      abilities,
      args.where,
      args,
    );

    return this.userService.findFirst<T>({ ...userArgs, where }, prisma.user);
  }

  /**
   * Find zero or more Users that matches the filter.
   * Note, that providing 'undefined' is treated as the value not being there.
   * Read more here: https://pris.ly/d/null-undefined
   * @param {UserFindManyArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Users
   * const users = await this.userService.findMany()
   *
   * // Get first 10 Users
   * const Users = await this.UserService.findMany({ take: 10 })
   *
   * // Only select the 'id'
   * const userWithIdOnly = await this.UserService.findMany({ select: { id: true } })
   *
   *
   */
  async findMany<T extends Prisma.UserFindManyArgs>(
    abilities: AppAbility,
    args: Prisma.SelectSubset<T, Prisma.UserFindManyArgs>,
    prisma: PrismaService = this.prismaClient,
  ) {
    const userArgs = this.selectService.getUserArgs(abilities, args);

    const where = this.selectService.getUserWhereInput(
      abilities,
      args.where,
      args,
    );

    console.log(inspect(args, false, null, true));
    console.log(inspect({ ...args, ...userArgs, where }, false, null, true));

    return this.userService.findMany<T>(
      { ...args, ...userArgs, where },
      prisma.user,
    );
  }

  /**
   * Create a User.
   * @param {UserCreateArgs} args - Arguments to create a User.
   * @example
   * // Create one User
   * const User = await this.userService.create({
   *  data: {
   *    // ... data to create a User
   *  }
   * })
   */
  async create<T extends Prisma.UserCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.UserCreateArgs>,
    prisma: PrismaService = this.prismaClient,
  ) {
    // const { toRemove, select } = this.selectService.getUserCaslSelect(args);
    // const fn = async (transaction: PrismaTransactionService) => {
    //   const user = await this.userService.create<T>(
    //     {
    //       ...args,
    //       select: deepmerge(args.select || {}, select.select || {}),
    //     },
    //     transaction.user,
    //   );
    //   const validatedUser = this.validateAbilities.validateUserDeep(
    //     abilities,
    //     Action.Create,
    //     user,
    //   );
    //   return this.selectService.removeUnusedProperties(validatedUser, toRemove);
    // };
    // return prisma && !('$transaction' in prisma)
    //   ? fn(prisma)
    //   : (prisma || this.prismaClient).$transaction(fn);
    return this.userService.create<T>(args, prisma.user);
  }

  /**
   * Update a User.
   * @param {UserUpdateArgs} args - Arguments to update a User.
   * @example
   * // Update one User
   * const user = await this.userService.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   *
   */
  async update<T extends Prisma.UserUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.UserUpdateArgs>,
    prisma: PrismaService = this.prismaClient,
  ) {
    return this.userService.update<T>(args, prisma.user);
  }

  /**
   * Create or update one User.
   * @param {UserUpsertArgs} args - Arguments to update or create a User.
   * @example
   * // Upsert one User
   * const user = await this.userService.upsert({
   *   create: {
   *     // ... data to create a User
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the User we want to update
   *   }
   * })
   *
   */
  async upsert<T extends Prisma.UserUpsertArgs>(
    args: Prisma.SelectSubset<T, Prisma.UserUpsertArgs>,
    prisma: PrismaService = this.prismaClient,
  ) {
    return this.userService.upsert<T>(args, prisma.user);
  }

  /**
   *     Delete a User.
   *     @param {UserDeleteArgs} args - Arguments to delete a User
   *     @example
   *     // Delete one User
   *     const user = await this.userService.delete({
   * where: {
   *  // ... filter to delete one User
   * }
   *     })
   *
   */
  async delete<T extends Prisma.UserDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.UserDeleteArgs>,
    prisma: PrismaService = this.prismaClient,
  ) {
    return this.userService.delete<T>(args, prisma.user);
  }

  /**
   * Count the number of User.
   * Note, that providing 'undefined' is treated as the value not being there.
   * Read more here: https://pris.ly/d/null-undefined
   * @param {UserCountArgs} args - Arguments to filter Users to count.
   * @example
   * // Count one User
   * const User = await this.userService.count({
   *  data: {
   *    // ... data to count a User
   *  }
   * })
   *
   *
   */
  async count<T extends Prisma.UserCountArgs>(
    args: Prisma.SelectSubset<T, Prisma.UserCountArgs>,
    prisma: PrismaService = this.prismaClient,
  ) {
    return this.userService.count<T>(args, prisma.user);
  }

  /**
   *  Allows you to perform aggregations operations on a User.
   *  Note, that providing 'undefined' is treated as the value not being there.
   *  Read more here: https://pris.ly/d/null-undefined
   *  @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
   *  @example
   *  // Ordered by age ascending
   *  // Where email contains prisma.io
   *  // Limited to the 10 users
   *  const aggregations = await this.userService.aggregate({
   *    avg: {
   *      age: true,
   *    },
   *    where: {
   *      email: {
   *  contains: "prisma.io",
   *      },
   *    },
   *    orderBy: {
   *      age: "asc",
   *    },
   *    take: 10,
   *  })
   *
   */
  async aggregate<T extends Prisma.UserAggregateArgs>(
    args: Prisma.SelectSubset<T, Prisma.UserAggregateArgs>,
    prisma: PrismaService = this.prismaClient,
  ) {
    return this.userService.aggregate<T>(args, prisma.user);
  }
}
