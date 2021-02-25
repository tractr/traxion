import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';

import { UserService } from '../generated/user';

@Injectable()
export class UserCustomService extends UserService {
  public async findMany(params: Prisma.UserFindManyArgs): Promise<User[]> {
    console.log(
      'I am replacing default Userservice, but I will call his findMany method anyway',
    );
    return super.findMany(params);
  }
}
