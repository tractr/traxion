import { Inject, Injectable } from '@nestjs/common';
import { Response } from 'express';
import { authenticator } from 'otplib';
import { toFileStream } from 'qrcode';

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

    const otpAuthUrl = authenticator.keyuri(
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

    return otpAuthUrl;
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

  public async pipeQrCodeStream(stream: Response, otpauthUrl: string) {
    return toFileStream(stream, otpauthUrl);
  }
}
