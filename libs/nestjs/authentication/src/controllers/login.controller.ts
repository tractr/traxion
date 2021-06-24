import {
  Controller,
  Get,
  HttpCode,
  Inject,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';

import { User } from '../../prisma/client';
import { AUTHENTICATION_MODULE_OPTIONS } from '../constants';
import { CurrentUser } from '../decorators';
import { LocalAuthGuard } from '../guards';
import { AuthenticationOptions } from '../interfaces';
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
    @Req() req: Request & { user: User },
    @Res() res: Response,
  ): Promise<void> {
    const token = await this.authenticationService.login(req.user);
    res.cookie(
      this.authenticationOptions.cookies.cookieName,
      token.accessToken,
    );
    res.json(token);
  }

  @Get('login')
  @Post('login')
  async logout(@Res() res: Response): Promise<void> {
    res.cookie(this.authenticationOptions.cookies.cookieName, '');
    res.end();
  }

  @Get('me')
  getProfile(@CurrentUser() user: User): User {
    return user;
  }
}
