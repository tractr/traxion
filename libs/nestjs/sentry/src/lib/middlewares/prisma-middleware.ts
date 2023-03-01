import { Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { getCurrentHub } from '@sentry/node';

import { PrismaService } from '@trxn/nestjs-database';

@Injectable()
export class PrismaMiddleware {
  private isConnected = false;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(private moduleRef: ModuleRef) {}

  connectMiddlewareOnce(): void {
    // Avoid multiple listeners
    if (this.isConnected) {
      return;
    }

    try {
      // We try to get the database service from the module ref
      // We do not fail in case no database has been register in the app
      const prismaService: PrismaService = this.moduleRef.get(
        PrismaService as new (...args: unknown[]) => PrismaService,
        {
          strict: false,
        },
      );
      this.listenDatabaseTransactions(prismaService);
      this.isConnected = true;

      // eslint-disable-next-line no-empty
    } catch {}
  }

  private listenDatabaseTransactions(prismaService: PrismaService): void {
    prismaService.$use((params, next) => {
      const { model, action, runInTransaction, args } = params;
      const description = [model, action].filter(Boolean).join('.');
      const data = {
        model,
        action,
        runInTransaction,
        args,
      };

      // Send query to global scope, will be filtered with request scope
      const scope = getCurrentHub().getScope();
      scope?.addBreadcrumb({
        type: 'query',
        category: 'database',
        message: description,
        data,
      });

      return next(params);
    });
  }
}
