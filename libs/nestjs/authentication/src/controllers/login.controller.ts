import {
  BadRequestException,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { Request, Response } from 'express';

import { AccessTokenDto } from '../dtos';
import { LoginPostBodyDto } from '../dtos/login-form.dto';
import { JwtAuthGuard, LocalAuthGuard, PublicGuard } from '../guards';
import {
  AuthenticationService,
  CookieOptionsService,
  UserAuthenticationService,
} from '../services';

import { CurrentUser } from '@tractr/nestjs-core';

@Controller()
export class LoginController {
  constructor(
    private readonly cookieOptionsService: CookieOptionsService,
    private readonly userAuthenticationService: UserAuthenticationService,
    private readonly authenticationService: AuthenticationService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiBody({ type: LoginPostBodyDto })
  @HttpCode(200)
  async login(
    @Req() req: Request & { secret?: string; user: User },
    @Res({ passthrough: true }) res: Response,
  ): Promise<AccessTokenDto> {
    const token = await this.authenticationService.login(req.user);
    res.cookie(this.cookieOptionsService.cookieName, token.accessToken, {
      signed: !!req.secret,
      ...this.cookieOptionsService.cookieOptions,
    });
    return {
      ...token,
    };
  }

  @Post('logout')
  @UseGuards(PublicGuard)
  @HttpCode(200)
  async postLogout(@Res({ passthrough: true }) res: Response) {
    res.cookie(
      this.cookieOptionsService.cookieName,
      '',
      this.cookieOptionsService.cookieOptions,
    );
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async me(
    @Req() req: Request & { user: User },
    @CurrentUser() currentUserInfo: User,
  ): Promise<User> {
    const user = await this.userAuthenticationService.getUserFromId(
      currentUserInfo.id,
    );

    if (!user) {
      throw new BadRequestException();
    }

    return user as User;
  }
}
