import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { User } from '../interfaces';
import { AuthenticationService, StrategyOptionsService } from '../services';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(
    private readonly authenticationService: AuthenticationService,
    protected readonly strategyOptionsService: StrategyOptionsService,
  ) {
    super(strategyOptionsService.createLocalStrategyOptions());
  }

  async validate(req: never, login: string, password: string): Promise<User> {
    const user = await this.authenticationService.validateUser(login, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
