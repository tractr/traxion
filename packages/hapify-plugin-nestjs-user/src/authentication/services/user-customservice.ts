import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';

import { UserService } from '../../generated.example/user';

@Injectable()
export class UserCustomService extends UserService {
  public async findUnique(
    params: Prisma.UserFindUniqueArgs,
  ): Promise<User | null> {
    return super.findUnique(params);
  }
}
