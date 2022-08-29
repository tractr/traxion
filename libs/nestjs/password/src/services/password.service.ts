import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { BadPasswordError } from '../errors';
import { UserPasswordService } from './user-password.service';

import { UserNotFoundError } from '@tractr/nestjs-authentication';

@Injectable()
export class PasswordService {
  constructor(private readonly userPasswordService: UserPasswordService) {}

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

    if (!bcrypt.compareSync(oldPassword, password)) {
      throw new BadPasswordError();
    }

    await this.userPasswordService.updateUserPassword(userId, newPassword);
  }
}
