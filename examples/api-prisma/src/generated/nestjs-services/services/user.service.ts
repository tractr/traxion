import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';

import { EncryptionService } from './encryption.service';

import {
  ExcludePrismaField,
  excludePrismaField,
  PrismaService,
} from '@trxn/nestjs-database';

@Injectable()
export class UserService {
  constructor(
    private readonly prismaClient: PrismaService,
    private readonly encryptionService: EncryptionService,
  ) {}

  async encryptFields<
    T extends {
      password?: User['password'] | Prisma.StringFieldUpdateOperationsInput;
    },
  >(data: T): Promise<T> {
    let encryptedData = {};
    if (data.password) {
      const password =
        typeof data.password === 'string' ? data.password : data.password.set;
      if (password) {
        const encryptedPassword = await this.encryptionService.encrypt(
          password,
        );
        encryptedData = {
          ...encryptedData,
          password:
            typeof data.password === 'string'
              ? encryptedPassword
              : { set: encryptedPassword },
        };
      }
    }

    return {
      ...data,
      ...encryptedData,
    };
  }

  excludeHiddenFields<
    T extends User,
    S extends Prisma.UserSelect | undefined | null,
  >(data: T, select: S | null = null) {
    const password = (
      !!select && select?.password === true ? null : 'password'
    ) as ExcludePrismaField<S, 'password'>;

    const excludeKeys = [password];

    return excludePrismaField(data, excludeKeys);
  }

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
   *
   */
  async findUnique<
    T extends Prisma.UserFindUniqueArgs,
    GlobalRejectSettings extends
      | Prisma.RejectOnNotFound
      | Prisma.RejectPerOperation
      | false
      | undefined,
  >(
    args: Prisma.SelectSubset<T, Prisma.UserFindUniqueArgs>,
    prisma: Prisma.UserDelegate<GlobalRejectSettings> = this.prismaClient.user,
  ) {
    const user = await prisma.findUnique<T, false>(args);

    return user === null ? user : this.excludeHiddenFields(user, args.select);
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
   */
  async findFirst<
    T extends Prisma.UserFindFirstArgs,
    GlobalRejectSettings extends
      | Prisma.RejectOnNotFound
      | Prisma.RejectPerOperation
      | false
      | undefined,
  >(
    args: Prisma.SelectSubset<T, Prisma.UserFindFirstArgs>,
    prisma: Prisma.UserDelegate<GlobalRejectSettings> = this.prismaClient.user,
  ) {
    const user = await prisma.findFirst<T, false>(args);

    return user === null ? user : this.excludeHiddenFields(user, args.select);
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
   */
  async findMany<
    T extends Prisma.UserFindManyArgs,
    GlobalRejectSettings extends
      | Prisma.RejectOnNotFound
      | Prisma.RejectPerOperation
      | false
      | undefined,
  >(
    args: Prisma.SelectSubset<T, Prisma.UserFindManyArgs>,
    prisma: Prisma.UserDelegate<GlobalRejectSettings> = this.prismaClient.user,
  ) {
    const users = await prisma.findMany<T>(args);

    return users.map((data) => this.excludeHiddenFields(data, args.select));
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
   */
  async create<
    T extends Prisma.UserCreateArgs,
    GlobalRejectSettings extends
      | Prisma.RejectOnNotFound
      | Prisma.RejectPerOperation
      | false
      | undefined,
  >(
    args: Prisma.SelectSubset<T, Prisma.UserCreateArgs>,
    prisma: Prisma.UserDelegate<GlobalRejectSettings> = this.prismaClient.user,
  ) {
    const { data } = args;
    const user = await prisma.create<T>({
      ...args,
      data: await this.encryptFields(data),
    });
    return user === null ? user : this.excludeHiddenFields(user, args.select);
  }

  /**
   * Create many Users.
   *
   * @example
   * // Create many Users
   * const Users = await this.userService.createMany({
   *   data: {
   *     // ... provide data here
   *   }
   * })
   */
  async createMany<
    T extends Prisma.UserCreateManyArgs,
    GlobalRejectSettings extends
      | Prisma.RejectOnNotFound
      | Prisma.RejectPerOperation
      | false
      | undefined,
  >(
    args: Prisma.SelectSubset<T, Prisma.UserCreateManyArgs>,
    prisma: Prisma.UserDelegate<GlobalRejectSettings> = this.prismaClient.user,
  ) {
    const { data } = args;
    return prisma.createMany<T>({
      ...args,
      data: Promise.all(
        (Array.isArray(data) ? data : [data]).map((item) =>
          this.encryptFields(item),
        ),
      ),
    });
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
   */
  async update<
    T extends Prisma.UserUpdateArgs,
    GlobalRejectSettings extends
      | Prisma.RejectOnNotFound
      | Prisma.RejectPerOperation
      | false
      | undefined,
  >(
    args: Prisma.SelectSubset<T, Prisma.UserUpdateArgs>,
    prisma: Prisma.UserDelegate<GlobalRejectSettings> = this.prismaClient.user,
  ) {
    const { data } = args;
    const user = await prisma.update<T>({
      ...args,
      data: await this.encryptFields(data),
    });
    return user === null ? user : this.excludeHiddenFields(user, args.select);
  }

  /**
   * Update 0 or more Users.
   * Note, that providing 'undefined' is treated as the value not being there.
   * Read more here: https://pris.ly/d/null-undefined
   * @param {UserUpdateManyArgs} args - Arguments to update one or more Users.
   * @example
   * // Update many Users
   * const users = await this.userService.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   */
  async updateMany<
    T extends Prisma.UserUpdateManyArgs,
    GlobalRejectSettings extends
      | Prisma.RejectOnNotFound
      | Prisma.RejectPerOperation
      | false
      | undefined,
  >(
    args: Prisma.SelectSubset<T, Prisma.UserUpdateManyArgs>,
    prisma: Prisma.UserDelegate<GlobalRejectSettings> = this.prismaClient.user,
  ) {
    const { data } = args;
    return prisma.updateMany<T>({
      ...args,
      data: Promise.all(
        (Array.isArray(data) ? data : [data]).map((item) =>
          this.encryptFields(item),
        ),
      ),
    });
  }

  /**
   * Create or update one User.
   *  @param {UserUpsertArgs} args - Arguments to update or create a User.
   *  @example
   *  // Upsert one User
   *  const user = await this.userService.upsert({
   *    create: {
   *      // ... data to create a User
   *    },
   *    update: {
   *      // ... in case it already exists, update
   *    },
   *    where: {
   *      // ... the filter for the User we want to update
   *    }
   *  })
   */
  async upsert<
    T extends Prisma.UserUpsertArgs,
    GlobalRejectSettings extends
      | Prisma.RejectOnNotFound
      | Prisma.RejectPerOperation
      | false
      | undefined,
  >(
    args: Prisma.SelectSubset<T, Prisma.UserUpsertArgs>,
    prisma: Prisma.UserDelegate<GlobalRejectSettings> = this.prismaClient.user,
  ) {
    const { create, update } = args;
    const user = await prisma.upsert<T>({
      ...args,
      create: await this.encryptFields(create),
      update: await this.encryptFields(update),
    });
    return user === null ? user : this.excludeHiddenFields(user, args.select);
  }

  /**
   * Delete a User.
   * @param {UserDeleteArgs} args - Arguments to delete a User
   * @example
   * // Delete one User
   * const user = await this.userService.delete({
   *   where: {
   *     // ... filter to delete one User
   *   }
   * })
   *
   */
  async delete<
    T extends Prisma.UserDeleteArgs,
    GlobalRejectSettings extends
      | Prisma.RejectOnNotFound
      | Prisma.RejectPerOperation
      | false
      | undefined,
  >(
    args: Prisma.SelectSubset<T, Prisma.UserDeleteArgs>,
    prisma: Prisma.UserDelegate<GlobalRejectSettings> = this.prismaClient.user,
  ) {
    const user = await prisma.delete<T>(args);

    return user === null ? user : this.excludeHiddenFields(user, args.select);
  }

  /**
   * Delete 0 or more Users.
   * @param {UserDeleteArgs} args - Arguments to filter  Users to delete.
   * @example
   * // Delete a few Users
   * const users = await this.userService.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   *
   */
  async deleteMany<
    T extends Prisma.UserDeleteArgs,
    GlobalRejectSettings extends
      | Prisma.RejectOnNotFound
      | Prisma.RejectPerOperation
      | false
      | undefined,
  >(
    args: Prisma.SelectSubset<T, Prisma.UserDeleteManyArgs>,
    prisma: Prisma.UserDelegate<GlobalRejectSettings> = this.prismaClient.user,
  ) {
    return prisma.deleteMany<T>(args);
  }

  /**
   * Count the number of User.
   * Note, that providing 'undefined' is treated as the value not being there.
   * Read more here: https://pris.ly/d/null-undefined
   * @param {UserCountArgs} args - Arguments to filter Users to count.
   * @example
   * // Count one User
   * const User = await this.userService.count({
   *   data: {
   *     // ... data to count a User
   *   }
   * })
   */
  async count<
    T extends Prisma.UserCountArgs,
    GlobalRejectSettings extends
      | Prisma.RejectOnNotFound
      | Prisma.RejectPerOperation
      | false
      | undefined,
  >(
    args: Prisma.SelectSubset<T, Prisma.UserCountArgs>,
    prisma: Prisma.UserDelegate<GlobalRejectSettings> = this.prismaClient.user,
  ) {
    return prisma.count<T>(args);
  }

  /**
   * Allows you to perform aggregations operations on a User.
   * Note, that providing 'undefined' is treated as the value not being there.
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
   */
  async aggregate<
    T extends Prisma.UserAggregateArgs,
    GlobalRejectSettings extends
      | Prisma.RejectOnNotFound
      | Prisma.RejectPerOperation
      | false
      | undefined,
  >(
    args: Prisma.SelectSubset<T, Prisma.UserAggregateArgs>,
    prisma: Prisma.UserDelegate<GlobalRejectSettings> = this.prismaClient.user,
  ) {
    return prisma.aggregate<T>(args);
  }
}
