import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';

import { UserService, USER_SERVICE } from '@generated/nestjs-models-common';
import { JwtTokenPayload } from '../dtos';
import { StrategyOptionsService } from '../services';

import { User } from '@prisma/client';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(USER_SERVICE)
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
      throw new Error('User not found');
    }

    return user;
  }
}
