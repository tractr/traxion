import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';
import { PassportStrategy } from '@nestjs/passport';
import { User } from '@prisma/client';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtTokenPayload } from '../dtos';

import { UserService } from '../services';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<JwtModuleOptions>('jwt').secret,
    });
  }

  async validate(payload: JwtTokenPayload): Promise<User> {
    const user = await this.userService.findOne({ id: payload.sub });

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }
}
