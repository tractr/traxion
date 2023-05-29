import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  UnauthorizedException,
} from '@nestjs/common';
import { Response } from 'express';

import { CookieOptionsService } from '../services';

import { getResponseFromContext } from '@trxn/nestjs-core';

@Catch(UnauthorizedException)
export class UnauthorizedExceptionFilter implements ExceptionFilter {
  constructor(private readonly cookieOptionsService: CookieOptionsService) {}

  catch(exception: UnauthorizedException, host: ArgumentsHost) {
    const response = getResponseFromContext(host) as Response;

    if (!response && host.getType<string>() === 'graphql') {
      console.warn(
        'UnauthorizedExceptionFilter: response not found in context, you should `context: ({ req, res }) => ({ req, res })` in your graphql context',
      );
    }

    if (!response) {
      console.warn(
        'UnauthorizedExceptionFilter: response not found in context',
      );
      return;
    }

    response.cookie(this.cookieOptionsService.cookieName, '', {});
  }
}
