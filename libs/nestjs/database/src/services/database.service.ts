/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Inject,
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';

import { MysqlService } from './mysql.service';
import { PostgresqlService } from './postgresql.service';
import { PRISMA_MODULE_OPTIONS } from '../constants';

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

export type ConnectorType = 'mysql' | 'postgresql';

@Injectable()
export class DatabaseService
  extends PrismaClient<Prisma.PrismaClientOptions & EnforcePrismaClientOptions>
  implements OnModuleInit, OnModuleDestroy
{
  protected LOG_CONTEXT = 'DatabaseService';
  constructor(
    @Inject(PRISMA_MODULE_OPTIONS)
    protected readonly prismaOptions: PrismaClientOptions,
    protected readonly logger: Logger,
    protected readonly postgresql: PostgresqlService,
    protected readonly mysql: MysqlService,
  ) {
    super({ ...prismaOptions, ...enforceOptions });
  }

  async onModuleInit(): Promise<void> {
    await this.$connect();

    this.$on('query', (e) => this.logger.debug(e.query, this.LOG_CONTEXT));
    this.$on('warn', (e) => this.logger.warn(e.message, this.LOG_CONTEXT));
    this.$on('info', (e) => this.logger.log(e.message, this.LOG_CONTEXT));
    this.$on('error', (e) => this.logger.error(e.message, this.LOG_CONTEXT));
  }

  async onModuleDestroy(): Promise<void> {
    await this.$disconnect();
  }

  getActiveProvider(): ConnectorType {
    if (
      this.prismaOptions.datasources?.db?.url &&
      this.prismaOptions.datasources.db.url.includes('postgresql')
    )
      return 'postgresql';

    throw new Error('Unknown database provider type');
  }

  async truncateDatabase(schemaName?: string, force = false): Promise<void> {
    if (process.env.NODE_ENV !== 'development' && !force)
      throw new Error(
        'Cannot truncate the database when in production, use force if you are sure',
      );

    const provider = this.getActiveProvider();

    if (typeof this[provider].truncate === 'function')
      return this[provider].truncate(this, schemaName);

    throw new Error(
      'Database provider type has no truncate method implemented',
    );
  }
}
