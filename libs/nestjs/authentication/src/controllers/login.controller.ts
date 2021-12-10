import {
  Controller,
  Get,
  HttpCode,
  HttpException,
  Inject,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';

import { AUTHENTICATION_MODULE_OPTIONS } from '../constants';
import { User } from '../decorators';
import { AccessTokenDto, AuthenticationOptions } from '../dtos';
import { LocalAuthGuard } from '../guards';
import { UserType } from '../interfaces';
import { AuthenticationService } from '../services';

@Controller()
export class LoginController {
  constructor(
    @Inject(AUTHENTICATION_MODULE_OPTIONS)
    private readonly authenticationOptions: AuthenticationOptions,
    private readonly authenticationService: AuthenticationService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(200)
  async login(
    @Req() req: Request & { secret: string },
    @Res({ passthrough: true }) res: Response,
  ): Promise<AccessTokenDto & { user: UserType }> {
    const user = this.throwIfNoUser(req);
    const token = await this.authenticationService.login(user);
    res.cookie(
      this.authenticationOptions.cookies.cookieName,
      token.accessToken,
      {
        signed: !!req.secret,
        ...this.authenticationOptions.cookies.options,
      },
    );
    return { ...token, user };
  }

  @Get('logout')
  async logout(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<void> {
    this.throwIfNoUser(req);
    res.cookie(
      this.authenticationOptions.cookies.cookieName,
      '',
      this.authenticationOptions.cookies.options,
    );
  }

  @Post('logout')
  async postLogout(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<void> {
    return this.logout(req, res);
  }

  @Get('me')
  me(@Req() req: Request, @User() user: UserType): UserType {
    this.throwIfNoUser(req);
    return user;
  }

  throwIfNoUser(req: Request): UserType {
    if (!req.user)
      throw new HttpException(
        'It seems like you are using @tractr/nestjs-authentication without adding a global APP_GUARD. Try to add the provider.',
        501,
      );
    return req.user as unknown as UserType;
  }
}
