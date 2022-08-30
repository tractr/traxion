import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';

import { MODULE_OPTIONS_TOKEN } from '../authentication.module-definition';
import { JwtTokenPayload } from '../dtos';
import { AuthenticationModuleOptions } from '../interfaces';
import { StrategyOptionsService, UserAuthenticationService } from '../services';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userAuthenticationService: UserAuthenticationService,
    @Inject(MODULE_OPTIONS_TOKEN)
    private readonly authenticationOptions: AuthenticationModuleOptions,
    protected readonly strategyOptionsService: StrategyOptionsService,
  ) {
    super(strategyOptionsService.passportJwtOptions);
  }

  async validate(payload: JwtTokenPayload) {
    const user = await this.userAuthenticationService.getUserFromId(
      payload.sub,
      this.authenticationOptions.user?.customSelect,
    );

    if (!user) {
      throw new BadRequestException();
    }

    return user;
  }
}
