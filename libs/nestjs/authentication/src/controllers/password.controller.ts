import {
  Body,
  Controller,
  HttpCode,
  Post,
  Put,
  UnauthorizedException,
} from '@nestjs/common';

import { PasswordResetDto, PasswordResetRequestedDto } from '../dtos';
import { BadResetCodeError, UserNotFoundError } from '../errors';
import { PasswordService } from '../services';

import { Public } from '@tractr/nestjs-core';

@Controller('password')
export class PasswordController {
  constructor(private readonly passwordService: PasswordService) {}

  @Public()
  @Post('reset')
  @HttpCode(204)
  async resetRequested(
    @Body() { email }: PasswordResetRequestedDto,
  ): Promise<void> {
    try {
      await this.passwordService.requestReset(email);
    } catch (e) {
      // We should never send information about a user not found
      if (e instanceof UserNotFoundError) return;

      throw e;
    }
  }

  @Public()
  @Put('reset')
  @HttpCode(204)
  async reset(@Body() { id, code, password }: PasswordResetDto): Promise<void> {
    try {
      await this.passwordService.reset(id, code, password);
    } catch (e) {
      if (e instanceof BadResetCodeError || e instanceof UserNotFoundError) {
        throw new UnauthorizedException(e);
      }

      throw e;
    }
  }
}
