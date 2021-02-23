import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { Request } from 'express';
import { CurrentUser } from '../decorators';
import { AccessTokenDto } from '../dtos';
import { LocalAuthGuard } from '../guards';
import { AuthService } from '../services';

@Controller()
export class LoginController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Req() req: Request): Promise<AccessTokenDto> {
    return this.authService.login(req.user as User);
  }

  @Get('me')
  getProfile(@CurrentUser() user: User): User {
    return user;
  }
}
