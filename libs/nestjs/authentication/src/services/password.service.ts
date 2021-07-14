import * as Crypto from 'crypto';

import { Inject, Injectable } from '@nestjs/common';

import { AUTHENTICATION_MODULE_OPTIONS } from '../constants';
import { UserNotFoundError } from '../errors';
import { AuthenticationOptions } from '../interfaces';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class PasswordService {
  constructor(
    @Inject(AUTHENTICATION_MODULE_OPTIONS)
    private readonly authenticationOptions: AuthenticationOptions,
    private readonly authenticationService: AuthenticationService,
  ) {}

  async requestReset(email: string): Promise<void> {
    const idField = this.authenticationOptions.strategy.local.idField ?? 'id';

    // Get user from email
    const user = await this.authenticationService.findUserByLogin(email, {
      [idField]: true,
    });
    if (!user) throw new UserNotFoundError();

    // Create reset code
    const code = this.createResetCode(
      this.authenticationOptions.password?.resetCodeLength,
    );

    // Link user to token in database

    // Send email
  }

  createResetCode(length = 128): string {
    return Crypto.randomBytes(Math.floor(length / 2)).toString('hex');
  }

  async reset(id: string, code: string, password: string): Promise<void> {
    // Find user code in database
    // Check if the codes match (If not return unauthorized)
    // Hash and set the password
  }
}
