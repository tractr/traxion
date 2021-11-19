import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import {
  USER_SERVICE,
  UserService,
} from '../../generated/nestjs-models-common';
import { User } from '../../prisma/client';
import { AUTHENTICATION_MODULE_OPTIONS } from '../constants';
import { AccessTokenDto } from '../dtos';
import { BadPasswordError, UserNotFoundError } from '../errors';
import { AuthenticationOptions } from '../interfaces';

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
    const passwordField =
      this.authenticationOptions.strategy.local.passwordField ?? 'password';

    const user = await this.findUserByLogin(login, { [passwordField]: true });
    if (!user) throw new UserNotFoundError();

    if (await this.verifyPassword(password, user.password)) {
      return this.findUserByLogin(login);
    }

    throw new BadPasswordError();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  findUserByLogin(login: string, select?: any) {
    const loginField =
      this.authenticationOptions.strategy.local.usernameField ?? 'email';
    if (!loginField) throw new Error('loginField is not defined');

    const findOneWhere = {
      [loginField]: login,
    };

    return this.userService.findUnique({
      where: findOneWhere,
      ...(select ? { select } : {}),
    });
  }

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(
      this.authenticationOptions.login.saltRounds ?? 10,
    );
    return bcrypt.hash(password, salt);
  }

  async verifyPassword(
    password: string,
    hash: string | null,
  ): Promise<boolean> {
    if (hash === null) return false;

    return bcrypt.compare(password, hash);
  }

  async createUserJWT(user: User): Promise<string> {
    return this.jwtService.sign({ sub: user.id });
  }

  async login(user: User): Promise<AccessTokenDto> {
    return {
      accessToken: await this.createUserJWT(user),
    };
  }
}
