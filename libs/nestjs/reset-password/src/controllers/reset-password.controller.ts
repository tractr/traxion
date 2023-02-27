import {
  Body,
  Controller,
  HttpCode,
  Post,
  Put,
  UnauthorizedException,
} from '@nestjs/common';

import { PasswordResetDto, PasswordResetRequestedDto } from '../dtos';
import { BadResetCodeError } from '../errors';
import { ResetPasswordService } from '../services';

import { UserNotFoundError } from '@trxn/nestjs-authentication';
import { Public } from '@trxn/nestjs-core';

@Controller('password/reset')
export class ResetPasswordController {
  constructor(private readonly resetPasswordService: ResetPasswordService) {}

  @Public()
  @Post()
  @HttpCode(204)
  async resetRequested(
    @Body() { id }: PasswordResetRequestedDto,
  ): Promise<void> {
    try {
      await this.resetPasswordService.requestResetPassword(id);
    } catch (e) {
      // We should never send information about a user not found
      if (e instanceof UserNotFoundError) return;
      throw e;
    }
  }

  @Public()
  @Put()
  @HttpCode(204)
  async reset(@Body() { id, code, password }: PasswordResetDto): Promise<void> {
    try {
      await this.resetPasswordService.reset(id, code, password);
    } catch (e) {
      if (e instanceof BadResetCodeError || e instanceof UserNotFoundError) {
        throw new UnauthorizedException(e);
      }
      throw e;
    }
  }
}
