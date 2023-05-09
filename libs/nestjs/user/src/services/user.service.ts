import { Inject, Injectable, Optional } from '@nestjs/common';

import { USER_SERVICE } from '../constants';
import { MinimalUser, User, UserId, UserOrmService } from '../interfaces';

@Injectable()
export class UserService {
  constructor(
    @Optional()
    @Inject(USER_SERVICE)
    protected readonly userOrmService: UserOrmService,
  ) {
    if (!userOrmService)
      throw new Error(
        'User orm service not found. Please add a USER_SERVICE or a UserService provider to the UserModule',
      );
  }

  getIdFromUser<U extends User = MinimalUser>(user: U): UserId {
    return user.id as UserId;
  }

  getPasswordFromUser<U extends User = MinimalUser>(user: U): string | null {
    return user.password as string;
  }

  getLoginFromUser<U extends User = MinimalUser>(user: U): string {
    return user.email as string;
  }

  async findUserById<U extends User = MinimalUser>(
    id: UserId,
    select?: Record<string, unknown>,
  ) {
    return this.userOrmService.findUnique<U>({
      where: {
        id,
      },
      select,
    });
  }

  async findUserByLogin<U extends User = MinimalUser>(
    login: string,
    select?: Record<string, unknown>,
  ) {
    return this.userOrmService.findUnique<U>({
      where: {
        email: login,
      },
      select,
    });
  }

  async getUserPassword<U extends User = MinimalUser>(
    id: UserId,
  ): Promise<string | null> {
    const userFound = await this.userOrmService.findUnique<U>({
      where: {
        id,
      },
      select: {
        password: true,
      },
    });

    return userFound ? this.getPasswordFromUser(userFound) : null;
  }

  async updatePassword<U extends User = MinimalUser>(
    id: UserId,
    password: string,
  ) {
    return this.userOrmService.update<U>({
      where: {
        id,
      },
      data: {
        password,
      },
    });
  }

  async update<U extends User = MinimalUser>(id: UserId, user: Partial<U>) {
    return this.userOrmService.update<U>({
      where: {
        id,
      },
      data: user,
    });
  }
}
