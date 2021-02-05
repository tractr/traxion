import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { AccessTokenDto } from '../dtos';
import { UserNotFoundError, BadPasswordError } from '../errors';
import { UserService } from './user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(login: string, password: string): Promise<User> {
    try {
      return await this.authenticateLoginCredentials(login, password);
    } catch {
      return null;
    }
  }

  async authenticateLoginCredentials(
    login: string,
    password: string
  ): Promise<User> {
    const findOneWhere = {
      [this.configService.get<keyof User>('login.loginField')]: login,
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
      this.configService.get<number>('login.password.saltLength')
    );
    return bcrypt.hash(password, salt);
  }

  async verifyPassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  public createUserJWT(user: User): string {
    return this.jwtService.sign({ sub: user.id });
  }

  async login(user: User): Promise<AccessTokenDto> {
    return {
      access_token: this.createUserJWT(user),
    };
  }
}
