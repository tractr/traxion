import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

import { MODULE_OPTIONS_TOKEN } from '../authentication.module-definition';
import { AccessTokenDto } from '../dtos';
import { AuthenticationModuleOptions } from '../interfaces';
import { UserAuthenticationService } from './user-authentication.service';

@Injectable()
export class AuthenticationService {
  constructor(
    @Inject(MODULE_OPTIONS_TOKEN)
    private readonly authenticationOptions: AuthenticationModuleOptions,
    private readonly userAuthenticationService: UserAuthenticationService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(login: string, password: string): Promise<User | null> {
    const user = await this.userAuthenticationService.getUserFromLogin(login);
    if (!user) return null;

    const passwordHash =
      await this.userAuthenticationService.getPasswordFromUser(user);
    if (!passwordHash) return null;

    const isValid = await this.comparePasswordHash(password, passwordHash);
    if (!isValid) return null;

    return user;
  }

  async generatePasswordHash(password: string): Promise<string> {
    if (this.authenticationOptions.generatePasswordHash) {
      return this.authenticationOptions.generatePasswordHash(password);
    }

    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }

  async comparePasswordHash(password: string, hash: string): Promise<boolean> {
    if (hash === null) return false;

    if (this.authenticationOptions.comparePasswordHash) {
      return this.authenticationOptions.comparePasswordHash(password, hash);
    }

    return bcrypt.compare(password, hash);
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
