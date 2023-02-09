import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';

import { HashService } from './hash.service';
import { UserAuthenticationService } from './user-authentication.service';
import { MODULE_OPTIONS_TOKEN } from '../authentication.module-definition';
import { AccessTokenDto } from '../dtos';
import { AuthenticationModuleOptions } from '../interfaces';

@Injectable()
export class AuthenticationService {
  constructor(
    @Inject(MODULE_OPTIONS_TOKEN)
    private readonly authenticationOptions: AuthenticationModuleOptions,
    private readonly userAuthenticationService: UserAuthenticationService,
    private readonly jwtService: JwtService,
    private readonly hashService: HashService,
  ) {}

  async validateUser(login: string, password: string): Promise<User | null> {
    const user = await this.userAuthenticationService.getUserFromLogin(login);
    if (!user) return null;

    const passwordHash =
      await this.userAuthenticationService.getPasswordFromUser(user);
    if (!passwordHash) return null;

    const isValid = await this.hashService.compare(password, passwordHash);
    if (!isValid) return null;

    return user;
  }

  async createUserJWT(user: User): Promise<string> {
    return this.jwtService.sign({
      sub: user.id,
      ...(this.authenticationOptions.getUserJWT
        ? this.authenticationOptions.getUserJWT(user)
        : {}),
    });
  }

  async login(user: User): Promise<AccessTokenDto> {
    return {
      accessToken: await this.createUserJWT(user),
    };
  }
}
