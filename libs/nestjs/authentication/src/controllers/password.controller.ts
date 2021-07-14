import { Body, Controller, HttpCode, Post, Put } from '@nestjs/common';

import { PasswordResetDto, PasswordResetRequestedDto } from '../dtos';
import { PasswordService } from '../services';

import { Public } from '@tractr/nestjs-core';

@Controller('password')
export class PasswordController {
  constructor(private readonly passwordService: PasswordService) {}

  @Public()
  @Post('reset')
  @HttpCode(204)
  async resetRequested(@Body() body: PasswordResetRequestedDto): Promise<void> {
    return this.passwordService.requestReset(body.email);
  }

  @Public()
  @Put('reset')
  @HttpCode(204)
  async reset(@Body() body: PasswordResetDto): Promise<void> {
    return this.passwordService.reset(body.id, body.code, body.password);
  }
}
