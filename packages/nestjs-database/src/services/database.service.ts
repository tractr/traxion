/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Inject,
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaClientOptions } from '@prisma/client/runtime';
import { Logger } from '@tractr/nestjs-core';

import { PRISMA_MODULE_OPTIONS } from '../constants';

import { PrismaClient } from '@prisma/client';

export type QueryEvent = {
  timestamp: Date;
  query: string;
  params: string;
  duration: number;
  target: string;
};

export type LogEvent = {
  timestamp: Date;
  message: string;
  target: string;
};

@Injectable()
export class DatabaseService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy {
  constructor(
    @Inject(PRISMA_MODULE_OPTIONS)
    protected readonly prismaOptions: PrismaClientOptions,
    protected readonly logger: Logger,
  ) {
    super(prismaOptions);
    this.logger.setContext('DatabaseService:PrismaClient');
  }

  async onModuleInit(): Promise<void> {
    await this.$connect();

    (this as any).$on('query', (e: QueryEvent) => this.logger.debug(e.query));
    (this as any).$on('warn', (e: LogEvent) => this.logger.warn(e.message));
    (this as any).$on('info', (e: LogEvent) => this.logger.log(e.message));
    (this as any).$on('error', (e: LogEvent) => this.logger.error(e.message));
  }

  async onModuleDestroy(): Promise<void> {
    await this.$disconnect();
  }
}
