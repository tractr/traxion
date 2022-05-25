import {
  Injectable,
  Logger,
  LogLevel,
  LoggerService as NestjsLoggerService,
  Scope,
} from '@nestjs/common';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Metadata = { [key: string]: any };
export type Message = string | { message: string };
export type Context = string | { context: string };

@Injectable({ scope: Scope.TRANSIENT })
export class LoggerService extends Logger implements NestjsLoggerService {
  // Not using this.context because nestjs ConsoleLogger add it
  // to the end of the message automatically
  public ctx?: string;
  public metadata: Metadata = {};

  public setContext(context: string) {
    this.ctx = context;
  }

  public setMetadata(metadata: Metadata) {
    this.metadata = metadata;
  }

  public log(
    message: Message | (Message & Metadata),
    context: Context | (Context & Metadata) | Metadata = {},
    metadata: Metadata = {},
  ): void {
    const {
      message: msg,
      context: ctx,
      metadata: meta,
    } = this.extractMessageContextAndMetaFromInterface(
      message,
      context,
      metadata,
    );
    return this.super('log', msg, meta, ctx);
  }

  public error(
    messageOrError: Error | Message | (Message & Metadata),
    contextOrStack: Context | (Context & Metadata) | Metadata = {},
    metadataOrContext: Metadata | string = {},
  ): void {
    let stack: string | undefined;
    let message: Message | (Message & Metadata);
    let context: Context | (Context & Metadata) | Metadata;
    let metadata: Metadata = {};

    if (typeof metadataOrContext === 'string') {
      context = metadataOrContext;

      if (typeof contextOrStack === 'string') {
        stack = contextOrStack;
      } else {
        metadata = contextOrStack;
      }
    } else {
      context = contextOrStack;
      metadata = metadataOrContext;
    }

    if (messageOrError instanceof Error) {
      message = messageOrError.message;
      stack = messageOrError.stack;
    } else {
      message = messageOrError;
    }

    const {
      message: msg,
      context: ctx,
      metadata: meta,
    } = this.extractMessageContextAndMetaFromInterface(message, context, {
      ...metadata,
      stack,
    });

    return this.super('error', msg, meta, ctx);
  }

  public warn(
    message: Message | (Message & Metadata),
    context: Context | (Context & Metadata) | Metadata = {},
    metadata: Metadata = {},
  ): void {
    const {
      message: msg,
      context: ctx,
      metadata: meta,
    } = this.extractMessageContextAndMetaFromInterface(
      message,
      context,
      metadata,
    );

    return this.super('warn', msg, meta, ctx);
  }

  public debug(
    message: Message | (Message & Metadata),
    context: Context | (Context & Metadata) | Metadata = {},
    metadata: Metadata = {},
  ): void {
    const {
      message: msg,
      context: ctx,
      metadata: meta,
    } = this.extractMessageContextAndMetaFromInterface(
      message,
      context,
      metadata,
    );

    return this.super('debug', msg, meta, ctx);
  }

  public verbose(
    message: Message | (Message & Metadata),
    context: Context | (Context & Metadata) | Metadata = {},
    metadata: Metadata = {},
  ): void {
    const {
      message: msg,
      context: ctx,
      metadata: meta,
    } = this.extractMessageContextAndMetaFromInterface(
      message,
      context,
      metadata,
    );

    return this.super('verbose', msg, meta, ctx);
  }

  private extractMessageContextAndMetaFromInterface(
    message: Message | (Message & Metadata),
    context: Context | (Context & Metadata) | Metadata,
    metadata: Metadata,
  ): {
    message: string;
    context: string | undefined;
    metadata: Metadata | undefined;
  } {
    let meta: Metadata = { ...this.metadata };
    let msg: string;
    let ctx: string | undefined;

    if (typeof message !== 'string') {
      const { message: msg_, ...meta_ } = message;
      msg = msg_;
      meta = { ...meta, ...meta_ };
    } else {
      msg = message;
    }

    if (typeof context !== 'string') {
      const { context: ctx_, ...meta_ } = context;
      ctx = ctx_;
      meta = { ...meta, ...meta_ };
    } else {
      ctx = context;
    }

    if (typeof metadata === 'object') {
      meta = { ...meta, ...metadata };
    }

    ctx = ctx || this.ctx;

    return {
      message: msg,
      context: ctx,
      metadata: Object.keys(meta).length ? meta : undefined,
    };
  }

  private super(
    method: LogLevel,
    message: string,
    metadata?: Metadata,
    context?: string,
  ) {
    const params = [message, metadata, context].filter(
      (u) => typeof u !== 'undefined',
    ) as [string, Metadata?, string?];
    return super[method](...params);
  }
}
