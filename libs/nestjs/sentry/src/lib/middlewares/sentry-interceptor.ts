import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  Scope,
  Type,
} from '@nestjs/common';
import {
  ContextType,
  HttpArgumentsHost,
  RpcArgumentsHost,
  WsArgumentsHost,
} from '@nestjs/common/interfaces';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { Handlers } from '@sentry/node';
import { Extras } from '@sentry/types';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { SentryInterceptorOptions } from '../interfaces';
import { SentryLogger, SentryPerRequestLogger } from '../services';

/**
 * This class is based on https://github.com/ntegral/nestjs-sentry/blob/master/lib/sentry.interceptor.ts
 */
export function SentryInterceptor(options: SentryInterceptorOptions): Type {
  class SentryInterceptorClass implements NestInterceptor {
    constructor(
      protected sentryPerRequestLogger: SentryPerRequestLogger,
      protected sentryLogger: SentryLogger,
    ) {}

    intercept(
      context: ExecutionContext,
      next: CallHandler,
    ): Observable<unknown> {
      // first param would be for events, second is for errors
      return next.handle().pipe(
        tap(null, (exception) => {
          if (this.shouldReport(exception as Error)) {
            this.captureException(context, exception as Error);
          }
        }),
      );
    }

    protected captureException(
      context: ExecutionContext,
      exception: Error,
    ): void {
      switch (context.getType<ContextType>()) {
        case 'http':
          this.captureHttpException(context.switchToHttp(), exception);
          break;
        case 'rpc':
          this.captureRpcException(context.switchToRpc(), exception);
          break;
        case 'ws':
          this.captureWsException(context.switchToWs(), exception);
          break;
        default:
          this.captureGenericException(exception);
          break;
      }
    }

    protected captureHttpException(
      http: HttpArgumentsHost,
      exception: Error,
    ): void {
      const data = Handlers.parseRequest({}, http.getRequest(), {});

      const extras: Extras = {
        request: data.request,
        user: data.user,
        ...data.extra,
      };
      this.sentryPerRequestLogger.handleError(exception, extras);
    }

    protected captureRpcException(
      rpc: RpcArgumentsHost,
      exception: Error,
    ): void {
      const extras: Extras = {
        rpcData: rpc.getData(),
      };
      this.sentryLogger.handleError(exception, extras);
    }

    protected captureWsException(ws: WsArgumentsHost, exception: Error): void {
      const extras: Extras = {
        wsClient: ws.getClient(),
        wsData: ws.getData(),
      };
      this.sentryLogger.handleError(exception, extras);
    }

    protected captureGenericException(exception: Error): void {
      this.sentryPerRequestLogger.handleError(exception);
    }

    /**
     * Denotes if the exception should be sent to Sentry, based on filters in config.
     */
    protected shouldReport(exception: Error): boolean {
      if (!options.filters) return true;

      // If all filters pass, then we do report
      return options.filters.every((filter) => filter(exception));
    }
  }

  Injectable({ scope: Scope.REQUEST })(SentryInterceptorClass);

  return SentryInterceptorClass;
}

export const SentryAppInterceptorProvider = (
  options: SentryInterceptorOptions = {},
) => ({
  provide: APP_INTERCEPTOR,
  useFactory: (
    sentryPerRequestLogger: SentryPerRequestLogger,
    sentryLogger: SentryLogger,
  ) => new (SentryInterceptor(options))(sentryPerRequestLogger, sentryLogger),
  inject: [SentryPerRequestLogger, SentryLogger],
  scope: Scope.REQUEST,
});
