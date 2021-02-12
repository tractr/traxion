import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { Request } from 'express';
import {
  User as UserDecorator,
  JwtAuthGuard,
  LocalAuthGuard,
  AuthService,
  AccessTokenDto,
} from '../../common';

@Controller()
export class LoginController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Req() req: Request): Promise<AccessTokenDto> {
    return this.authService.login(req.user as User);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@UserDecorator() user: User): User {
    return user;
  }
}
