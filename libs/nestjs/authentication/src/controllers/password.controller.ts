import {
  Body,
  Controller,
  HttpCode,
  Patch,
  Post,
  Put,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from '@prisma/client';

import {
  PasswordResetDto,
  PasswordResetRequestedDto,
  PasswordUpdateDto,
} from '../dtos';
import { BadResetCodeError, UserNotFoundError } from '../errors';
import { PasswordService } from '../services';

import { CurrentUser, Public } from '@tractr/nestjs-core';

@Controller('password')
export class PasswordController {
  constructor(private readonly passwordService: PasswordService) {}

  @Patch('update')
  async updatePassword(
    @Body() { oldPassword, newPassword }: PasswordUpdateDto,
    @CurrentUser() user: User,
  ): Promise<void> {
    await this.passwordService.updatePassword(
      user.id,
      oldPassword,
      newPassword,
    );
  }

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
