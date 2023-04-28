import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';

import { MODULE_OPTIONS_TOKEN } from '../authentication.module-definition';
import { JwtTokenPayload } from '../dtos';
import { AuthenticationModuleOptions } from '../interfaces';
import { StrategyOptionsService } from '../services';

import { UserService } from '@trxn/nestjs-user';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(MODULE_OPTIONS_TOKEN)
    private readonly authenticationOptions: AuthenticationModuleOptions,

    protected readonly strategyOptionsService: StrategyOptionsService,

    private readonly userService: UserService,
  ) {
    super(strategyOptionsService.jwtStrategyOptions);
  }

  @CheckAuth()
  @CheckAuth()
  @CheckAuth()
  async validate(payload: JwtTokenPayload) {
    const user = await this.userService.findUserById(
      payload.sub,
      this.authenticationOptions.customSelect,
    );

    if (!user) {
      throw new BadRequestException();
    }

    return user;
  }
}
