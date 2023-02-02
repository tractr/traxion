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
import { MODULE_OPTIONS_TOKEN } from '../database.module-definition';
import { DatabaseModuleOptions } from '../interfaces';

export type Provider = 'mysql' | 'postgresql';

@Injectable()
export class ManagePrismaClientService
  implements OnModuleInit, OnModuleDestroy
{
  protected LOG_CONTEXT = 'DatabaseService';

  readonly defaultPrismaClientOptions: Prisma.PrismaClientOptions = {
    log: [
      { emit: 'event', level: 'query' },
      { emit: 'event', level: 'info' },
      { emit: 'event', level: 'warn' },
      { emit: 'event', level: 'error' },
    ],
  };

  prismaClient: PrismaClient<{
    log: [
      { emit: 'event'; level: 'query' },
      { emit: 'event'; level: 'info' },
      { emit: 'event'; level: 'warn' },
      { emit: 'event'; level: 'error' },
    ];
  }>;

  constructor(
    @Inject(MODULE_OPTIONS_TOKEN)
    protected readonly databaseModuleOptions: DatabaseModuleOptions,
    protected readonly logger: Logger,
    protected readonly postgresql: PostgresqlService,
    protected readonly mysql: MysqlService,
  ) {
    const {
      prismaClient,
      prismaOptions,
      addExtras = true,
    } = this.databaseModuleOptions;

    this.prismaClient =
      prismaClient ??
      new PrismaClient({
        ...prismaOptions,
        ...(addExtras ? this.defaultPrismaClientOptions : {}),
      });
  }

  async onModuleInit(): Promise<void> {
    await this.prismaClient.$connect();

    if (this.databaseModuleOptions.addExtras !== false) this.addExtras();
  }

  async onModuleDestroy(): Promise<void> {
    await this.prismaClient.$disconnect();
  }

  /*
   * Add extras capabilities to the database service like the ability to put the
   * log inside nestjs logger.
   *
   * If the prismaClient options is used the PrismaClient instance must configure
   * the log option and set the emit config to event to be able to use the extras.
   */
  addExtras(): void {
    this.prismaClient.$on(
      'query',
      ({ query, duration, params, target, timestamp }) => {
        this.logger.verbose(
          {
            message: query,
            duration,
            params,
            target,
            timestamp,
          },
          this.LOG_CONTEXT,
        );
      },
    );
    this.prismaClient.$on('warn', (e) =>
      this.logger.warn(e.message, this.LOG_CONTEXT),
    );
    this.prismaClient.$on('info', (e) =>
      this.logger.log(e.message, this.LOG_CONTEXT),
    );
    this.prismaClient.$on('error', (e) =>
      this.logger.error(e.message, this.LOG_CONTEXT),
    );

    const truncateDatabase = this.truncateDatabase.bind(this);

    this.prismaClient = this.prismaClient.$extends({
      client: {
        async $truncate(
          schemaName?: (typeof Prisma.ModelName)[keyof typeof Prisma.ModelName],
          force = false,
        ) {
          return truncateDatabase(schemaName, force);
        },
      },
    }) as unknown as PrismaClient;
  }

  getActiveProvider(): Provider {
    // eslint-disable-next-line no-underscore-dangle
    return (
      this.prismaClient as unknown as { _getActiveProvider: () => Provider }
    )._getActiveProvider();
  }

  async truncateDatabase(
    schemaName?: (typeof Prisma.ModelName)[keyof typeof Prisma.ModelName],
    force = false,
  ): Promise<void> {
    if (process.env.NODE_ENV !== 'development' && !force)
      throw new Error(
        'Cannot truncate the database when in production, use force if you are sure',
      );

    const provider = this.getActiveProvider();

    if (typeof this[provider].truncate === 'function')
      return this[provider].truncate(this.prismaClient, schemaName);

    throw new Error(
      'Database provider type has no truncate method implemented or is not supported',
    );
  }
}
