import {
  BadRequestException,
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
import { ApiBody } from '@nestjs/swagger';
import { Request, Response } from 'express';

import {
  AUTHENTICATION_MODULE_OPTIONS,
  AUTHENTICATION_USER_SERVICE,
} from '../constants';
import { AccessTokenDto, AuthenticationOptions } from '../dtos';
import { LoginPostBodyDto } from '../dtos/login-form.dto';
import { LocalAuthGuard } from '../guards';
import { UserService, UserType } from '../interfaces';
import { AuthenticationService } from '../services';

import { CurrentUser } from '@tractr/nestjs-core';

@Controller()
export class LoginController {
  constructor(
    @Inject(AUTHENTICATION_USER_SERVICE)
    private readonly userService: UserService,
    @Inject(AUTHENTICATION_MODULE_OPTIONS)
    private readonly authenticationOptions: AuthenticationOptions,
    private readonly authenticationService: AuthenticationService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiBody({ type: LoginPostBodyDto })
  @HttpCode(200)
  async login(
    @Req() req: Request & { secret: string },
    @Res({ passthrough: true }) res: Response,
  ): Promise<AccessTokenDto> {
    const user = this.throwIfNoUser(req);
    const token = await this.authenticationService.login(user);
    const { options: cookieOptions } = this.authenticationOptions.cookies;
    res.cookie(
      this.authenticationOptions.cookies.cookieName,
      token.accessToken,
      {
        signed: !!req.secret,
        ...cookieOptions,
      },
    );
    return {
      ...token,
    };
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
  async me(
    @Req() req: Request,
    @CurrentUser() currentUserInfo: UserType,
  ): Promise<UserType> {
    this.throwIfNoUser(req);

    const user = await this.userService.findUnique({
      where: { id: currentUserInfo.id as string },
    });

    if (!user) {
      throw new BadRequestException();
    }

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
