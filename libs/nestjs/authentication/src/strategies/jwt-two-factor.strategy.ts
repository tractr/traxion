import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';

import {
  AUTHENTICATION_MODULE_OPTIONS,
  AUTHENTICATION_USER_SERVICE,
} from '../constants';
import { AuthenticationOptions, JwtTokenPayload } from '../dtos';
import { UserService } from '../interfaces';
import { StrategyOptionsService } from '../services';

@Injectable()
export class JwtTwoFactorStrategy extends PassportStrategy(
  Strategy,
  'jwt-two-factor',
) {
  constructor(
    @Inject(AUTHENTICATION_MODULE_OPTIONS)
    private readonly authenticationOptions: AuthenticationOptions,
    @Inject(AUTHENTICATION_USER_SERVICE)
    private readonly userService: UserService,
    protected readonly strategyOptionsService: StrategyOptionsService,
  ) {
    super(strategyOptionsService.createJwtStrategyOptions());
  }

  async validate(payload: JwtTokenPayload) {
    const {
      otp,
      userConfig: { otpField },
    } = this.authenticationOptions;

    const user = await this.userService.findUnique({
      where: { id: payload.sub },
      // Use select clause provided by the module consumer
      select: {
        ...this.authenticationOptions.userConfig.customSelect,
        [otpField]: otp,
      },
    });

    if (!user) {
      throw new BadRequestException();
    }
    if (otp && !user[otpField]) {
      return user;
    }
    if (!payload.isSecondFactorAuthenticated) {
      throw new BadRequestException();
    }

    return user;
  }
}
