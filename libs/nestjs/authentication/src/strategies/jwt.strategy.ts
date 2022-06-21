import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';

import {
  AUTHENTICATION_MODULE_OPTIONS,
  AUTHENTICATION_USER_SERVICE,
} from '../constants';
import { AuthenticationOptions, JwtTokenPayload } from '../dtos';
import { UserService, UserType } from '../interfaces';
import { StrategyOptionsService } from '../services';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(AUTHENTICATION_USER_SERVICE)
    private readonly userService: UserService,
    @Inject(AUTHENTICATION_MODULE_OPTIONS)
    private readonly authenticationOptions: AuthenticationOptions,
    protected readonly strategyOptionsService: StrategyOptionsService,
  ) {
    super(strategyOptionsService.createJwtStrategyOptions());
  }

  async validate(payload: JwtTokenPayload): Promise<UserType> {
    const user = await this.userService.findUnique({
      where: { id: payload.sub },
      // Use select clause provided by the module consumer
      select: this.authenticationOptions.userConfig.customSelect,
    });
    if (!user) {
      throw new BadRequestException();
    }
    if (!user.otp) {
      return user;
    }
    if (!payload.isSecondFactorAuthenticated) {
      throw new BadRequestException();
    }
    return user;
  }
}
