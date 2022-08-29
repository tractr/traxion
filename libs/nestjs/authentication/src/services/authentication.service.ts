import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import {
  AUTHENTICATION_MODULE_OPTIONS,
  AUTHENTICATION_USER_SERVICE,
} from '../constants';
import { AccessTokenDto, AuthenticationOptions } from '../dtos';
import { UserNotFoundError } from '../errors';
import { UserType } from '../interfaces';
import { UserService } from '../interfaces/user.service.interface';

@Injectable()
export class AuthenticationService {
  constructor(
    @Inject(AUTHENTICATION_MODULE_OPTIONS)
    private readonly authenticationOptions: AuthenticationOptions,
    @Inject(AUTHENTICATION_USER_SERVICE)
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    login: string,
    password: string,
  ): Promise<UserType | null> {
    try {
      return await this.authenticateLoginCredentials(login, password);
    } catch {
      return null;
    }
  }

  async authenticateLoginCredentials(
    login: string,
    password: string,
  ): Promise<UserType | null> {
    const { passwordField, customSelect } =
      this.authenticationOptions.userConfig;

    // Fetch user and use select clause provided by the module consumer
    const user = await this.findUserByLogin(login, customSelect);
    if (!user) throw new UserNotFoundError();

    const { [passwordField]: passwordBcrypt } =
      (await this.findUserByLogin(login, {
        [passwordField]: true,
      })) ?? {};

    if (await this.verifyPassword(password, passwordBcrypt as string | null)) {
      return user;
    }

    throw new UserNotFoundError();
  }

  findUserByLogin(
    login: string,
    select?: Record<string, boolean>,
  ): Promise<UserType | null> {
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

  async createUserJWT(user: UserType): Promise<string> {
    return this.jwtService.sign({ sub: user.id });
  }

  async login(user: UserType): Promise<AccessTokenDto> {
    return {
      accessToken: await this.createUserJWT(user),
    };
  }
}
