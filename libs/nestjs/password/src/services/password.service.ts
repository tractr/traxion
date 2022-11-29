import { Injectable } from '@nestjs/common';

import { BadPasswordError } from '../errors';
import { HashService } from './hash.service';
import { UserPasswordService } from './user-password.service';

import { UserNotFoundError } from '@trxn/nestjs-authentication';

@Injectable()
export class PasswordService {
  constructor(
    private readonly userPasswordService: UserPasswordService,
    private readonly hashService: HashService,
  ) {}

  async updatePassword(
    userId: string,
    oldPassword: string,
    newPassword: string,
  ) {
    const user = await this.userPasswordService.getUserFromId(userId);

    if (!user) {
      throw new UserNotFoundError();
    }

    const { password } = user;

    const isValid = await this.hashService.compare(oldPassword, password);

    if (!isValid) {
      throw new BadPasswordError();
    }

    await this.userPasswordService.updateUserPassword(userId, newPassword);
  }
}
