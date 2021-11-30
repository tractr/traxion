import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';

import { AUTHENTICATION_USER_SERVICE } from '../constants';
import { JwtTokenPayload } from '../dtos';
import { User, UserService } from '../interfaces';
import { StrategyOptionsService } from '../services';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(AUTHENTICATION_USER_SERVICE)
    private readonly userService: UserService,
    protected readonly strategyOptionsService: StrategyOptionsService,
  ) {
    super(strategyOptionsService.createJwtStrategyOptions());
  }

  async validate(payload: JwtTokenPayload): Promise<User> {
    const user = await this.userService.findUnique({
      where: { id: payload.sub },
    });

    if (!user) {
      throw new BadRequestException();
    }

    return user;
  }
}
