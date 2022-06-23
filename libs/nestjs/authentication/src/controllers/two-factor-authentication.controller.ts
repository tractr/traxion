import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  HttpCode,
  Inject,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Request, Response } from 'express';

import { AUTHENTICATION_MODULE_OPTIONS } from '../constants';
import { CurrentUser } from '../decorators';
import { AuthenticationOptions, TwoFactorAuthenticationCodeDto } from '../dtos';
import { JwtAuthGuard } from '../guards';
import {
  AuthenticationService,
  TwoFactorAuthenticationService,
} from '../services';

@Controller('2fa')
@UseInterceptors(ClassSerializerInterceptor)
export class TwoFactorAuthenticationController {
  constructor(
    private readonly twoFactorAuthenticationService: TwoFactorAuthenticationService,
    private readonly authenticationService: AuthenticationService,
    @Inject(AUTHENTICATION_MODULE_OPTIONS)
    private readonly authenticationOptions: AuthenticationOptions,
  ) {}

  @Post('generate')
  @UseGuards(JwtAuthGuard)
  async register(
    @Res() response: Response,
    @CurrentUser() user: { id: string; email: string },
  ) {
    const otpauthUrl =
      await this.twoFactorAuthenticationService.generateTwoFactorAuthenticationSecret(
        user,
      );

    return this.twoFactorAuthenticationService.pipeQrCodeStream(
      response,
      otpauthUrl,
    );
  }

  @Post('authenticate')
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  async authenticate(
    @CurrentUser() user: { id: string; otp: string },
    @Body() { code }: TwoFactorAuthenticationCodeDto,
    @Req() req: Request & { secret: string },
    @Res({ passthrough: true }) res: Response,
  ) {
    const isCodeValid =
      this.twoFactorAuthenticationService.isTwoFactorAuthenticationCodeValid(
        code,
        user,
      );

    if (!isCodeValid) {
      throw new UnauthorizedException('Wrong authentication code');
    }

    const { options: cookieOptions } = this.authenticationOptions.cookies;

    const { formatUser } = this.authenticationOptions.userConfig;

    const accessToken = await this.authenticationService.createUserJWT(
      user,
      true,
    );

    res.cookie(this.authenticationOptions.cookies.cookieName, accessToken, {
      signed: !!req.secret,
      ...cookieOptions,
    });

    return {
      accessToken,
      user: formatUser(user),
    };
  }
}
