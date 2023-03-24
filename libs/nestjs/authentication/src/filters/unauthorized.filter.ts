import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  UnauthorizedException,
} from '@nestjs/common';

import { CookieOptionsService } from '../services';

import { getResponseFromContext } from '@trxn/nestjs-core';

@Catch(UnauthorizedException)
export class UnauthorizedExceptionFilter implements ExceptionFilter {
  constructor(private readonly cookieOptionsService: CookieOptionsService) {}

  catch(exception: UnauthorizedException, host: ArgumentsHost) {
    const response = getResponseFromContext(host);
    const status = exception.getStatus();

    response.cookie(this.cookieOptionsService.cookieName, '', {});
    response.status(status).json(exception);
  }
}
