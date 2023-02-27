import { Injectable } from '@nestjs/common';

import { HashService } from './hash.service';
import { BadPasswordError } from '../errors';

import { UserNotFoundError } from '@trxn/nestjs-authentication';
import { UserId, UserService } from '@trxn/nestjs-user';

@Injectable()
export class PasswordService {
  constructor(
    private readonly userService: UserService,
    private readonly hashService: HashService,
  ) {}

  async updatePassword(
    userId: UserId,
    oldPassword: string,
    newPassword: string,
  ) {
    const user = await this.userService.findUserById(userId);

    if (!user) {
      throw new UserNotFoundError();
    }

    const { password } = user;

    const isValid = await this.hashService.compare(oldPassword, password);

    if (!isValid) {
      throw new BadPasswordError();
    }

    await this.userService.updatePassword(userId, newPassword);
  }
}
