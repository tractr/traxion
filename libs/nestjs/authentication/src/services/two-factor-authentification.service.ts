import { Inject, Injectable } from '@nestjs/common';
import { authenticator } from 'otplib';

import {
  AUTHENTICATION_USER_SERVICE,
  TWO_FACTOR_AUTHENTICATION,
} from '../constants';
import { UserService } from '../interfaces/user.service.interface';

@Injectable()
export class TwoFactorAuthenticationService {
  constructor(
    @Inject(AUTHENTICATION_USER_SERVICE)
    private readonly userService: UserService,
  ) {}

  public async generateTwoFactorAuthenticationSecret(user: {
    id: string;
    email: string;
  }) {
    const secret = authenticator.generateSecret();

    const otpauthUrl = authenticator.keyuri(
      user.email,
      TWO_FACTOR_AUTHENTICATION,
      secret,
    );
    const args = {
      where: {
        id: user.id,
      },
      data: {
        otp: secret,
      },
    };
    await this.userService.update(args);

    return otpauthUrl;
  }

  public isTwoFactorAuthenticationCodeValid(
    twoFactorAuthenticationCode: string,
    user: { otp: string },
  ) {
    return authenticator.verify({
      token: twoFactorAuthenticationCode,
      secret: user.otp,
    });
  }
}
