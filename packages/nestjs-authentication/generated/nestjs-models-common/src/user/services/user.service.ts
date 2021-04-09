/* eslint-disable @typescript-eslint/ban-types */
import { Inject, Injectable } from '@nestjs/common';

import { USER_DATABASE_SERVICE } from '../user-model.constant';
import { UserDatabaseService } from './user-database.service';

import { Prisma } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_DATABASE_SERVICE)
    protected readonly userDatabaseService: UserDatabaseService,
  ) {}

  /**
   * Find zero or one User that matches the filter.
   * @param {UserFindUniqueArgs} args - Arguments to find a User
   * @example
   * // Get one User
   * const user = await this.userService.findUnique({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * */
  public findUnique<T extends Prisma.UserFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.UserFindUniqueArgs>,
  ) {
    return this.userDatabaseService.findUnique(args);
  }

  /**
   * Find the first User that matches the filter.
   * Note, that providing `undefined` is treated as the value not being there.
   * Read more here: https://pris.ly/d/null-undefined
   * @param {UserFindFirstArgs} args - Arguments to find a User
   * @example
   * // Get one User
   * const user = await this.userService.findFirst({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * */
  public findFirst<T extends Prisma.UserFindFirstArgs>(
    args?: Prisma.SelectSubset<T, Prisma.UserFindFirstArgs>,
  ) {
    return this.userDatabaseService.findFirst(args);
  }

  /**
   * Find zero or more Users that matches the filter.
   * Note, that providing `undefined` is treated as the value not being there.
   * Read more here: https://pris.ly/d/null-undefined
   * @param {UserFindManyArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Users
   * const users = await this.userService.findMany()
   *
   * // Get first 10 Users
   * const users = await this.userService.findMany({ take: 10 })
   *
   * // Only select the `id`
   * const userWithIdOnly = await this.userService.findMany({ select: { id: true } })
   *
   * */
  findMany<T extends Prisma.UserFindManyArgs>(
    args?: Prisma.SelectSubset<T, Prisma.UserFindManyArgs>,
  ) {
    return this.userDatabaseService.findMany(args);
  }

  /**
   * Create a User.
   * @param {UserCreateArgs} args - Arguments to create a User.
   * @example
   * // Create one User
   * const User = await this.userService.create({
   *   data: {
   *     // ... data to create a User
   *   }
   * })
   *
   * */
  create<T extends Prisma.UserCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.UserCreateArgs>,
  ) {
    return this.userDatabaseService.create(args);
  }

  /**
   * Create many Users.
   * @param {UserCreateManyArgs} args - Arguments to create many Users.
   * @example
   * // Create many Users
   * const user = await this.userService.createMany({
   *   data: {
   *     // ... provide data here
   *   }
   * })
   *
   * */
  createMany<T extends Prisma.UserCreateManyArgs>(
    args?: Prisma.SelectSubset<T, Prisma.UserCreateManyArgs>,
  ) {
    return this.userDatabaseService.createMany(args);
  }

  /**
   * Delete a User.
   * @param {UserDeleteArgs} args - Arguments to delete one User.
   * @example
   * // Delete one User
   * const User = await this.userService.delete({
   *   where: {
   *     // ... filter to delete one User
   *   }
   * })
   *
   * */
  delete<T extends Prisma.UserDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.UserDeleteArgs>,
  ) {
    return this.userDatabaseService.delete(args);
  }

  /**
   * Update one User.
   * @param {UserUpdateArgs} args - Arguments to update one User.
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
   * */
  update<T extends Prisma.UserUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.UserUpdateArgs>,
  ) {
    return this.userDatabaseService.update(args);
  }

  /**
   * Delete zero or more Users.
   * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
   * @example
   * // Delete a few Users
   * const { count } = await this.userService.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   *
   * */
  deleteMany<T extends Prisma.UserDeleteManyArgs>(
    args?: Prisma.SelectSubset<T, Prisma.UserDeleteManyArgs>,
  ) {
    return this.userDatabaseService.deleteMany(args);
  }

  /**
   * Update zero or more Users.
   * Note, that providing `undefined` is treated as the value not being there.
   * Read more here: https://pris.ly/d/null-undefined
   * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Users
   * const user = await this.userService.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   *
   * */
  updateMany<T extends Prisma.UserUpdateManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.UserUpdateManyArgs>,
  ) {
    return this.userDatabaseService.updateMany(args);
  }

  /**
   * Create or update one User.
   * @param {UserUpsertArgs} args - Arguments to update or create a User.
   * @example
   * // Update or create a User
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
   * */
  upsert<T extends Prisma.UserUpsertArgs>(
    args: Prisma.SelectSubset<T, Prisma.UserUpsertArgs>,
  ) {
    return this.userDatabaseService.upsert(args);
  }

  /**
   * Count the number of Users.
   * Note, that providing `undefined` is treated as the value not being there.
   * Read more here: https://pris.ly/d/null-undefined
   * @param {UserCountArgs} args - Arguments to filter Users to count.
   * @example
   * // Count the number of Users
   * const count = await this.userService.count({
   *   where: {
   *     // ... the filter for the Users we want to count
   *   }
   * })
   * */
  count<T extends Prisma.UserCountArgs>(
    args?: Prisma.Subset<T, Prisma.UserCountArgs>,
  ) {
    return this.userDatabaseService.count(args);
  }

  /**
   * Allows you to perform aggregations operations on a User.
   * Note, that providing `undefined` is treated as the value not being there.
   * Read more here: https://pris.ly/d/null-undefined
   * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
   * @example
   * // Ordered by age ascending
   * // Where email contains prisma.io
   * // Limited to the 10 users
   * const aggregations = await this.userService.aggregate({
   *   avg: {
   *     age: true,
   *   },
   *   where: {
   *     email: {
   *       contains: "prisma.io",
   *     },
   *   },
   *   orderBy: {
   *     age: "asc",
   *   },
   *   take: 10,
   * })
   * */
  aggregate<T extends Prisma.UserAggregateArgs>(
    args: Prisma.Subset<T, Prisma.UserAggregateArgs>,
  ) {
    return this.userDatabaseService.aggregate(args);
  }
}
