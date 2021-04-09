import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { AUTHENTICATION_MODULE_OPTIONS } from '../constants';
import { AccessTokenDto } from '../dtos';
import { BadPasswordError, UserNotFoundError } from '../errors';
import { AuthenticationOptions } from '../interfaces';

import { USER_SERVICE, UserService } from '@generated/nestjs-models-common';
import { User } from '@prisma/client';

@Injectable()
export class AuthenticationService {
  constructor(
    @Inject(AUTHENTICATION_MODULE_OPTIONS)
    private readonly authenticationOptions: AuthenticationOptions,
    @Inject(USER_SERVICE)
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(login: string, password: string): Promise<User | null> {
    try {
      return await this.authenticateLoginCredentials(login, password);
    } catch {
      return null;
    }
  }

  async authenticateLoginCredentials(
    login: string,
    password: string,
  ): Promise<User | null> {
    const loginField =
      this.authenticationOptions.strategy.local.usernameField ?? 'email';
    if (!loginField) throw new Error('loginField is not defined');

    const findOneWhere = {
      [loginField]: login,
    };
    const user = await this.userService.findUnique({
      where: findOneWhere,
      select: { password: true },
    });

    if (!user) throw new UserNotFoundError();

    if (await this.verifyPassword(user.password, password)) {
      return this.userService.findUnique({ where: findOneWhere });
    }

    throw new BadPasswordError();
  }

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(
      this.authenticationOptions.login.saltRounds ?? 20,
    );
    return bcrypt.hash(password, salt);
  }

  async verifyPassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  async createUserJWT(user: User): Promise<string> {
    return this.jwtService.signAsync({ sub: user.id });
  }

  async login(user: User): Promise<AccessTokenDto> {
    return {
      accessToken: await this.createUserJWT(user),
    };
  }
}
