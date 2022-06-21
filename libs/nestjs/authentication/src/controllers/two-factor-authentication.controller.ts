import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  HttpCode,
  Post,
  UnauthorizedException,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { CurrentUser } from '../decorators';
import { TwoFactorAuthenticationCodeDto } from '../dtos';
import { JwtAuthGuard, JwtTwoFactorGuard, LocalAuthGuard } from '../guards';
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
  ) {}

  @Post('generate')
  @UseGuards(JwtAuthGuard)
  async register(@CurrentUser() user: { id: string; email: string }) {
    const otpauthUrl =
      await this.twoFactorAuthenticationService.generateTwoFactorAuthenticationSecret(
        user,
      );

    return otpauthUrl;
  }

  @Post('authenticate')
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  async authenticate(
    @CurrentUser() user: { id: string; otp: string },
    @Body() { code }: TwoFactorAuthenticationCodeDto,
  ) {
    const isCodeValid =
      this.twoFactorAuthenticationService.isTwoFactorAuthenticationCodeValid(
        code,
        user,
      );
    if (!isCodeValid) {
      throw new UnauthorizedException('Wrong authentication code');
    }

    return {
      accessToken: await this.authenticationService.createUserJWT(user, true),
    };
  }
}
