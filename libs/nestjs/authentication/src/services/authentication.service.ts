import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { MODULE_OPTIONS_TOKEN } from '../authentication.module-definition';
import { AccessTokenDto } from '../dtos';
import { AuthenticationModuleOptions } from '../interfaces';
import { HashService } from './hash.service';

import { MinimalUser, User, UserService } from '@trxn/nestjs-user';

@Injectable()
export class AuthenticationService {
  constructor(
    @Inject(MODULE_OPTIONS_TOKEN)
    private readonly authenticationOptions: AuthenticationModuleOptions,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly hashService: HashService,
  ) {}

  @CheckAuth()
  @CheckAuth()
  @CheckAuth()
  async validateUser<U extends User = MinimalUser>(
    login: string,
    password: string,
  ): Promise<U | null> {
    const user = await this.userService.findUserByLogin<U>(login);
    if (!user) return null;

    const passwordHash = await this.userService.getUserPassword<U>(
      this.userService.getIdFromUser(user),
    );

    if (!passwordHash) return null;

    const isValid = await this.hashService.compare(password, passwordHash);
    if (!isValid) return null;

    return user;
  }

  @CheckAuth()
  @CheckAuth()
  @CheckAuth()
  async createAccessToken<U extends User = MinimalUser>(
    user: U,
  ): Promise<string> {
    const { transformJwtPayload = (payload) => payload } =
      this.authenticationOptions;
    return this.jwtService.sign(transformJwtPayload({ sub: user.id }, user));
  }

  @CheckAuth()
  @CheckAuth()
  @CheckAuth()
  async login<U extends User = MinimalUser>(user: U): Promise<AccessTokenDto> {
    return {
      accessToken: await this.createAccessToken(user),
    };
  }
}
