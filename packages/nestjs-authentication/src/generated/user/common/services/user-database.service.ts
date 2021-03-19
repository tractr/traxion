import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@tractr/nestjs-database';

import { Prisma } from '@prisma/client';

@Injectable()
export class UserDatabaseService {
  constructor(protected readonly databaseService: DatabaseService) {}

  /**
   * Find zero or one User that matches the filter
   *
   * @param params - Arguments to find a unique User
   * @returns a User or null
   */
  public findUnique(
    params: Prisma.UserFindUniqueArgs,
  ): ReturnType<
    Prisma.UserDelegate<
      Prisma.PrismaClientOptions['rejectOnNotFound']
    >['findUnique']
  > {
    return this.databaseService.user.findUnique(params);
  }

  /**
   * Find the first User that matches the filter
   *
   * @param params - Arguments to find a User
   * @returns a User or null
   */
  public findFirst(
    params: Prisma.UserFindFirstArgs,
  ): ReturnType<
    Prisma.UserDelegate<
      Prisma.PrismaClientOptions['rejectOnNotFound']
    >['findFirst']
  > {
    return this.databaseService.user.findFirst(params);
  }

  /**
   * Find zero or more User entities that matches the filter
   *
   * @param params - Arguments to find User entities
   * @returns an array of User
   */
  public findMany(
    params: Prisma.UserFindManyArgs,
  ): ReturnType<
    Prisma.UserDelegate<
      Prisma.PrismaClientOptions['rejectOnNotFound']
    >['findMany']
  > {
    return this.databaseService.user.findMany(params);
  }

  /**
   * Create a new User
   *
   * @param params - Arguments to create a new User
   * @returns a new User
   */
  public create(
    params: Prisma.UserCreateArgs,
  ): ReturnType<
    Prisma.UserDelegate<
      Prisma.PrismaClientOptions['rejectOnNotFound']
    >['create']
  > {
    return this.databaseService.user.create(params);
  }

  /**
   * Update one User
   *
   * @param params - Arguments to update one User
   * @returns the updated User
   */
  public update(
    params: Prisma.UserUpdateArgs,
  ): ReturnType<
    Prisma.UserDelegate<
      Prisma.PrismaClientOptions['rejectOnNotFound']
    >['update']
  > {
    return this.databaseService.user.update(params);
  }

  /**
   * Update zero or more User entities
   *
   * @param params - Arguments to update one or more User entities
   * @returns the updated User entities
   */
  public updateMany(
    params: Prisma.UserUpdateManyArgs,
  ): ReturnType<
    Prisma.UserDelegate<
      Prisma.PrismaClientOptions['rejectOnNotFound']
    >['updateMany']
  > {
    return this.databaseService.user.updateMany(params);
  }

  /**
   * Create or update one User
   *
   * @param params - Arguments to update or create a User
   * @returns the created or updated User
   */
  public upsert(
    params: Prisma.UserUpsertArgs,
  ): ReturnType<
    Prisma.UserDelegate<
      Prisma.PrismaClientOptions['rejectOnNotFound']
    >['upsert']
  > {
    return this.databaseService.user.upsert(params);
  }

  /**
   * Delete a User
   *
   * @param params - Arguments to delete one User
   * @returns the deleted User
   */
  public delete(
    params: Prisma.UserDeleteArgs,
  ): ReturnType<
    Prisma.UserDelegate<
      Prisma.PrismaClientOptions['rejectOnNotFound']
    >['delete']
  > {
    return this.databaseService.user.delete(params);
  }

  /**
   * Delete zero or more User entities
   *
   * @param params - Arguments to filter User entities to delete
   * @returns the deleted User entities
   */
  public deleteMany(
    params: Prisma.UserDeleteManyArgs,
  ): ReturnType<
    Prisma.UserDelegate<
      Prisma.PrismaClientOptions['rejectOnNotFound']
    >['deleteMany']
  > {
    return this.databaseService.user.deleteMany(params);
  }

  /**
   * Count the number of User entities
   *
   * @param params - Arguments to filter User entities to count
   * @returns the number of User entities that matches the filter
   */
  public count(
    params: Prisma.UserCountArgs,
  ): ReturnType<
    Prisma.UserDelegate<Prisma.PrismaClientOptions['rejectOnNotFound']>['count']
  > {
    return this.databaseService.user.count(params);
  }

  /**
   * Allows to perform aggregations operations on a User
   *
   * @param params - Select aggragations to apply
   * @returns the result of the aggregation (number)
   */
  public aggregate(
    params: Prisma.UserAggregateArgs,
  ): ReturnType<
    Prisma.UserDelegate<
      Prisma.PrismaClientOptions['rejectOnNotFound']
    >['aggregate']
  > {
    return this.databaseService.user.aggregate(params);
  }
}
