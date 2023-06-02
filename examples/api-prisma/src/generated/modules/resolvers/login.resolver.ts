import { UnauthorizedException } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from '@prisma/client';
import { Request, Response } from 'express';

import { AccessTokenGraphQLDto, LoginArgsGraphQLDto } from './dtos';
import { User as UserGql } from '../../nestjs-graphql-dtos';
import { UserService } from '../../nestjs-services';

import {
  AuthenticationService,
  CookieOptionsService,
  HashService,
} from '@trxn/nestjs-authentication';
import { Public } from '@trxn/nestjs-core';
import {
  ensureRequestInContext,
  ensureResponseInContext,
} from '@trxn/nestjs-graphql';

@Resolver()
export class LoginResolver {
  constructor(
    private readonly cookieOptionsService: CookieOptionsService,
    private readonly authenticationService: AuthenticationService,
    private readonly userService: UserService,
    private readonly hashService: HashService,
  ) {}

  @Public()
  @Mutation(() => AccessTokenGraphQLDto)
  async login(
    @Context()
    context: {
      req?: Request & { secret?: string; user: User };
      res?: Response;
    },
    @Args({ nullable: true, defaultValue: {} })
    { email, password }: LoginArgsGraphQLDto,
  ): Promise<AccessTokenGraphQLDto> {
    const req = ensureRequestInContext(context);
    const res = ensureResponseInContext(context);

    const user = await this.userService.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    const { password: passwordHash } =
      (await this.userService.findUnique({
        where: {
          email,
        },
        select: {
          password: true,
        },
      })) || {};

    if (!passwordHash) {
      throw new UnauthorizedException();
    }

    const isValid = await this.hashService.compare(password, passwordHash);

    if (!isValid) {
      throw new UnauthorizedException();
    }

    const token = await this.authenticationService.login(user);

    res.cookie(this.cookieOptionsService.cookieName, token.accessToken, {
      signed: !!req.secret,
      ...this.cookieOptionsService.cookieOptions,
    });

    return {
      ...token,
      user,
    };
  }

  @Mutation(() => Boolean)
  async logout(@Context() context: { res?: Response }): Promise<boolean> {
    const res = ensureResponseInContext(context);
    res.cookie(
      this.cookieOptionsService.cookieName,
      '',
      this.cookieOptionsService.cookieOptions,
    );

    return true;
  }

  @Query(() => UserGql)
  async me(@Context() context: { req?: Response & { user: User } }) {
    const req = ensureRequestInContext(context);
    const { user } = req;

    return this.userService.findUnique({
      where: {
        id: user.id,
      },
    });
  }
}
