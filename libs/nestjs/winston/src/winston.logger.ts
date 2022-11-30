/* eslint @typescript-eslint/explicit-module-boundary-types: 'off' */
import { LoggerService } from '@nestjs/common';
import {
  createLogger,
  Logger as InternalWinstonLogger,
  LoggerOptions,
} from 'winston';

import { Context, Metadata } from '@trxn/nestjs-core';

export class WinstonLogger implements LoggerService {
  constructor(public readonly winston: InternalWinstonLogger) {}

  public log(
    message: string,
    metadataOrContext?: Metadata | Context,
    context?: string,
  ): void {
    this.printMessage('info', message, metadataOrContext, context);
  }

  public error(
    message: string,
    metadataOrContext?: Metadata | Context,
    context?: string,
  ): void {
    this.printMessage('error', message, metadataOrContext, context);
  }

  public warn(
    message: string,
    metadataOrContext?: Metadata | Context,
    context?: string,
  ): void {
    this.printMessage('warn', message, metadataOrContext, context);
  }

  public debug(
    message: string,
    metadataOrContext?: Metadata | Context,
    context?: string,
  ): void {
    this.printMessage('debug', message, metadataOrContext, context);
  }

  public verbose(
    message: string,
    metadataOrContext?: Metadata | Context,
    context?: string,
  ): void {
    this.printMessage('verbose', message, metadataOrContext, context);
  }

  private printMessage(
    level: string,
    message: string,
    metadataOrContext?: Metadata | Context,
    context?: string,
  ): void {
    let ctx = context;
    let meta: Metadata = {};
    if (typeof metadataOrContext === 'string' && typeof context === 'undefined')
      ctx = metadataOrContext;

    if (typeof metadataOrContext === 'object') meta = metadataOrContext;

    if (
      typeof metadataOrContext === 'string' &&
      typeof context !== 'undefined'
    ) {
      if ((metadataOrContext.match(/Error:.*\n/i) || [])?.length > 0) {
        meta = { stack: metadataOrContext };
      } else {
        meta = { misc: metadataOrContext };
      }
    }

    this.winston.log(level, message, { ...meta, context: ctx });
  }
}

export function createWinstonLogger(options?: LoggerOptions | undefined) {
  return new WinstonLogger(createLogger(options));
}
