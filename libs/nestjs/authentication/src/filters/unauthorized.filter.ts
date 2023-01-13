import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  UnauthorizedException,
} from '@nestjs/common';
import { Response } from 'express';

import { CookieOptionsService } from '../services';

@Catch(UnauthorizedException)
export class UnAuthorizedExceptionFilter implements ExceptionFilter {
  constructor(private readonly cookieOptionsService: CookieOptionsService) {}

  catch(exception: UnauthorizedException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    response.cookie(this.cookieOptionsService.cookieName, '', {});
    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
