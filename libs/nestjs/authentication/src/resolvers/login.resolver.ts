import { UnauthorizedException } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { Request, Response } from 'express';

import { AccessTokenGraphQLDto, LoginArgsGraphQLDto } from '../dtos';
import { AuthenticationService, CookieOptionsService } from '../services';

import { Public } from '@trxn/nestjs-core';
import {
  ensureRequestInContext,
  ensureResponseInContext,
} from '@trxn/nestjs-graphql';
import { MinimalUser, User } from '@trxn/nestjs-user';

@Resolver()
export class UserResolver {
  constructor(
    private readonly cookieOptionsService: CookieOptionsService,
    private readonly authenticationService: AuthenticationService,
  ) {}

  @Public()
  @Mutation(() => AccessTokenGraphQLDto)
  async login<U extends User = MinimalUser>(
    @Context()
    context: {
      req?: Request & { secret?: string; user: U };
      res?: Response;
    },
    @Args({ nullable: true, defaultValue: {} })
    { email, password }: LoginArgsGraphQLDto,
  ): Promise<AccessTokenGraphQLDto> {
    const req = ensureRequestInContext(context);
    const res = ensureResponseInContext(context);

    const user = await this.authenticationService.validateUser(email, password);

    if (!user) {
      throw new UnauthorizedException();
    }

    const token = await this.authenticationService.login(req.user);

    res.cookie(this.cookieOptionsService.cookieName, token.accessToken, {
      signed: !!req.secret,
      ...this.cookieOptionsService.cookieOptions,
    });

    return {
      ...token,
    };
  }

  @Mutation(() => Boolean)
  async logout(
    @Context()
    context: {
      res?: Response;
    },
  ) {
    const res = ensureResponseInContext(context);

    res.cookie(
      this.cookieOptionsService.cookieName,
      '',
      this.cookieOptionsService.cookieOptions,
    );

    return true;
  }
}
