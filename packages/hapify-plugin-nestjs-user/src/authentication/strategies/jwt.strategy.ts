import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { User } from '@prisma/client';
import { Strategy } from 'passport-jwt';
import { UserService } from '../../generated.example/user';
import { JwtTokenPayload } from '../dtos';
import { StrategyOptionsService } from '../services';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userService: UserService,
    protected readonly strategyOptionsService: StrategyOptionsService
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
