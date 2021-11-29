import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import {
  AUTHENTICATION_MODULE_OPTIONS,
  AUTHENTICATION_USER_SERVICE,
} from '../constants';
import { AccessTokenDto, AuthenticationModuleOptions } from '../dtos';
import { BadPasswordError, UserNotFoundError } from '../errors';
import { User } from '../interfaces';
import { UserService } from '../interfaces/user.service.interface';

@Injectable()
export class AuthenticationService {
  constructor(
    @Inject(AUTHENTICATION_MODULE_OPTIONS)
    private readonly authenticationOptions: AuthenticationModuleOptions,
    @Inject(AUTHENTICATION_USER_SERVICE)
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
    const { passwordField } = this.authenticationOptions.userConfig;

    const user = await this.findUserByLogin(login, { [passwordField]: true });
    if (!user) throw new UserNotFoundError();

    if (await this.verifyPassword(password, user[passwordField])) {
      return user;
    }

    throw new BadPasswordError();
  }

  findUserByLogin(
    login: string,
    select?: Record<string, boolean>,
  ): Promise<User | null> {
    const { loginField } = this.authenticationOptions.userConfig;

    if (!loginField) throw new Error('loginField is not defined');

    return this.userService.findUnique({
      where: {
        [loginField]: login,
      },
      ...(select ? { select } : {}),
    });
  }

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(
      this.authenticationOptions.password.saltRounds ?? 10,
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
