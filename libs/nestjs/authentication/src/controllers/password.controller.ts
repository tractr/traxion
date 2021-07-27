import {
  Body,
  Controller,
  HttpCode,
  NotFoundException,
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
    } catch (err) {
      if (err instanceof UserNotFoundError) {
        throw new NotFoundException(err);
      }

      throw err;
    }
  }

  @Public()
  @Put('reset')
  @HttpCode(204)
  async reset(@Body() { id, code, password }: PasswordResetDto): Promise<void> {
    try {
      await this.passwordService.reset(id, code, password);
    } catch (err) {
      if (err instanceof BadResetCodeError) {
        throw new UnauthorizedException(err);
      }

      if (err instanceof UserNotFoundError) {
        throw new NotFoundException(err);
      }

      throw err;
    }
  }
}
