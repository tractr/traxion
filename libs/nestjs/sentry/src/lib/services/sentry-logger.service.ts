import { ConsoleLogger, Inject, Injectable, Scope } from '@nestjs/common';
import {
  captureException,
  captureMessage,
  getCurrentHub,
  init,
  Integrations,
  setExtras,
  Severity,
} from '@sentry/node';
import { Extras } from '@sentry/types';

import { SENTRY_MODULE_OPTIONS } from '../constants';
import { SentryModuleOptions } from '../interfaces';

/**
 * This service is similar to https://github.com/ntegral/nestjs-sentry/blob/master/lib/sentry.service.ts
 */
@Injectable({ scope: Scope.DEFAULT })
export class SentryLogger extends ConsoleLogger {
  private static initialized = false;

  constructor(
    @Inject(SENTRY_MODULE_OPTIONS)
    protected readonly opts: SentryModuleOptions,
  ) {
    super();
    this.initSentryOnce();
  }

  private initSentryOnce(): void {
    // Avoid double call
    if (SentryLogger.initialized) {
      return;
    }
    SentryLogger.initialized = true;

    if (!(this.opts && this.opts.dsn)) {
      // Nothing to init
      this.handleSentryError(new Error('DSN is not defined'));
      return;
    }
    init({
      ...this.opts,
      integrations: [
        new Integrations.OnUncaughtException({
          onFatalError: (err) => {
            if (err.name === 'SentryError') {
              this.handleSentryError(err);
            } else {
              const hub = getCurrentHub();
              const client = hub.getClient();
              if (client) {
                client.captureException(err);
              } else {
                this.handleSentryError(err);
              }
            }
          },
        }),
        new Integrations.OnUnhandledRejection({ mode: 'warn' }),
      ],
    });
  }

  log(message: string, context?: string) {
    super.log(message, context);
    this.sendMessageToSentry(message, Severity.Log, context);
  }

  /**
   * Send an error as message
   */
  error(error: string, trace?: string, context?: string) {
    super.error(error, trace, context);
    this.sendMessageToSentry(error, Severity.Error, context);
  }

  warn(message: string, context?: string) {
    super.warn(message, context);
    this.sendMessageToSentry(message, Severity.Warning, context);
  }

  debug(message: string, context?: string) {
    super.debug(message, context);
    this.sendMessageToSentry(message, Severity.Debug, context);
  }

  verbose(message: string, context?: string) {
    super.verbose(message, context);
    this.sendMessageToSentry(message, Severity.Info, context);
  }

  /**
   * Send error as exception
   */
  handleError(error: Error, extras?: Extras, context?: string): void {
    super.error(error.message, error.stack, context);
    this.sendErrorToSentry(error, extras, context);
  }

  protected sendMessageToSentry(
    message: string,
    severity: Severity,
    context?: string,
  ) {
    try {
      captureMessage(message, severity);
    } catch (error) {
      this.handleSentryError(error, context);
    }
  }

  protected sendErrorToSentry(error: Error, extras?: Extras, context?: string) {
    try {
      if (extras) setExtras(extras);
      captureException(error);
    } catch (e) {
      this.handleSentryError(e, context);
    }
  }

  protected handleSentryError(error: Error | unknown, context?: string): void {
    if (error instanceof Error) {
      super.error(error.message, error.stack, context);
    } else {
      super.error(error);
    }
  }
}
