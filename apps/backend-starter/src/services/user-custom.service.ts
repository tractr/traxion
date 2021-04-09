import { Inject, Injectable } from '@nestjs/common';

import {
  USER_DATABASE_SERVICE,
  UserDatabaseService,
  UserService,
} from '@generated/nestjs-models-common';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserCustomService extends UserService {
  constructor(
    @Inject(USER_DATABASE_SERVICE)
    protected readonly userDatabaseService: UserDatabaseService,
  ) {
    super(userDatabaseService);
  }

  public findMany<T extends Prisma.UserFindManyArgs>(
    args?: Prisma.SelectSubset<T, Prisma.UserFindManyArgs>,
  ) {
    console.info(
      'I am replacing default Userservice, but I will call his findMany method anyway',
    );
    return super.findMany(args);
  }
}
