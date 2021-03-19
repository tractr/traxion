import {
  Controller,
  Get,
  Inject,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';

import { AUTHENTICATION_MODULE_OPTIONS } from '../constants';
import { CurrentUser } from '../decorators';
import { AccessTokenDto } from '../dtos';
import { LocalAuthGuard } from '../guards';
import { AuthenticationOptions } from '../interfaces';
import { AuthenticationService } from '../services';

import { User } from '@prisma/client';

@Controller()
export class LoginController {
  constructor(
    @Inject(AUTHENTICATION_MODULE_OPTIONS)
    private readonly authenticationOptions: AuthenticationOptions,
    private readonly authenticationService: AuthenticationService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<AccessTokenDto> {
    const token = await this.authenticationService.login(req.user as User);
    res.cookie(
      this.authenticationOptions.cookies.cookieName,
      token.accessToken,
    );
    return token;
  }

  @Get('me')
  getProfile(@CurrentUser() user: User): User {
    return user;
  }
}
