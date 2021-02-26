import { Inject, Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';

import { USER_DATABASE_SERVICE } from '../user-model.constant';
import { UserDatabaseService } from './user-database.service';
@Injectable()
export class UserService {
  constructor(
    @Inject(USER_DATABASE_SERVICE)
    private readonly userDatabaseService: UserDatabaseService,
  ) {}

  public async create(params: Prisma.UserCreateArgs): Promise<User> {
    return this.userDatabaseService.create(params);
  }

  public async findUnique(
    params: Prisma.UserFindUniqueArgs,
  ): Promise<User | null> {
    return this.userDatabaseService.findUnique(params);
  }

  public async findMany(params: Prisma.UserFindManyArgs): Promise<User[]> {
    return this.userDatabaseService.findMany(params);
  }

  public async count(params: Prisma.UserCountArgs): Promise<number> {
    return this.userDatabaseService.count(params);
  }

  public async update(params: Prisma.UserUpdateArgs): Promise<User> {
    return this.userDatabaseService.update(params);
  }

  public async upsert(params: Prisma.UserUpsertArgs): Promise<User> {
    return this.userDatabaseService.upsert(params);
  }

  public async delete(params: Prisma.UserDeleteArgs): Promise<User> {
    return this.userDatabaseService.delete(params);
  }
}
