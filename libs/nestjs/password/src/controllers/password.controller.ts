import { Body, Controller, Patch } from '@nestjs/common';
import { User } from '@prisma/client';

import { PasswordUpdateDto } from '../dtos';
import { PasswordService } from '../services';

import { CurrentUser } from '@trxn/nestjs-core';

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
}
