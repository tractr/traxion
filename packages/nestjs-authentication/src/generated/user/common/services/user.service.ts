import { Inject, Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';

import { USER_DATABASE_SERVICE } from '../user-model.constant';
import { UserDatabaseService } from './user-database.service';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_DATABASE_SERVICE)
    protected readonly userDatabaseService: UserDatabaseService,
  ) {}

  /**
   * Create a new User
   *
   * @param params - Arguments to create a new User
   * @returns a new User
   */
  public async create(params: Prisma.UserCreateArgs): Promise<User> {
    return this.userDatabaseService.create(params);
  }

  /**
   * Find zero or one User that matches the filter
   *
   * @param params - Arguments to find a unique User
   * @returns a User or null
   */
  public async findUnique(
    params: Prisma.UserFindUniqueArgs,
  ): Promise<User | null> {
    return this.userDatabaseService.findUnique(params);
  }

  /**
   * Find zero or more User entities that matches the filter
   *
   * @param params - Arguments to find User entities
   * @returns an array of User entities
   */
  public async findMany(params: Prisma.UserFindManyArgs): Promise<User[]> {
    return this.userDatabaseService.findMany(params);
  }

  /**
   * Count the number of User entities that matches the filter
   *
   * @param params - Arguments to filter User entities to count
   * @returns the number of User entities that matches the filter
   */
  public async count(params: Prisma.UserCountArgs): Promise<number> {
    return this.userDatabaseService.count(params);
  }

  /**
   * Update one User
   *
   * @param params - Arguments to update one User
   * @returns the updated User
   */
  public async update(params: Prisma.UserUpdateArgs): Promise<User> {
    return this.userDatabaseService.update(params);
  }

  /**
   * Create or update one User
   *
   * @param params - Arguments to update or create a User
   * @returns the created or updated User
   */
  public async upsert(params: Prisma.UserUpsertArgs): Promise<User> {
    return this.userDatabaseService.upsert(params);
  }

  /**
   * Delete a User
   *
   * @param params - Arguments to delete one User
   * @returns the deleted User
   */
  public async delete(params: Prisma.UserDeleteArgs): Promise<User> {
    return this.userDatabaseService.delete(params);
  }
}
