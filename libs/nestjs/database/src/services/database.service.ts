/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Inject,
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { Logger } from '@tractr/nestjs-core';

import { PRISMA_MODULE_OPTIONS } from '../constants';

import { Prisma, PrismaClient } from '@prisma/client';

export type PrismaClientOptions = Omit<
  Prisma.PrismaClientOptions,
  'rejectOnNotFound' | 'log'
>;

export type EnforcePrismaClientOptions = {
  rejectOnNotFound: false;
  log: [
    { emit: 'event'; level: 'query' },
    { emit: 'event'; level: 'info' },
    { emit: 'event'; level: 'warn' },
    { emit: 'event'; level: 'error' },
  ];
};

export const enforceOptions: EnforcePrismaClientOptions = {
  rejectOnNotFound: false,
  log: [
    { emit: 'event', level: 'query' },
    { emit: 'event', level: 'info' },
    { emit: 'event', level: 'warn' },
    { emit: 'event', level: 'error' },
  ],
};

@Injectable()
export class DatabaseService
  extends PrismaClient<Prisma.PrismaClientOptions & EnforcePrismaClientOptions>
  implements OnModuleInit, OnModuleDestroy {
  constructor(
    @Inject(PRISMA_MODULE_OPTIONS)
    protected readonly prismaOptions: PrismaClientOptions,
    protected readonly logger: Logger,
  ) {
    super({ ...prismaOptions, ...enforceOptions });
    this.logger.setContext('DatabaseService:PrismaClient');
  }

  async onModuleInit(): Promise<void> {
    await this.$connect();

    this.$on('query', (e) => this.logger.debug(e.query));
    this.$on('warn', (e) => this.logger.warn(e.message));
    this.$on('info', (e) => this.logger.log(e.message));
    this.$on('error', (e) => this.logger.error(e.message));
  }

  async onModuleDestroy(): Promise<void> {
    await this.$disconnect();
  }
}
