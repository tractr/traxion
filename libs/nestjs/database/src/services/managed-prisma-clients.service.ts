import {
  Inject,
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';

import { MODULE_OPTIONS_TOKEN } from '../database.module-definition';
import { DatabaseModuleOptions, PrismaClients } from '../interfaces';
import { MysqlService } from './mysql.service';
import { PostgresqlService } from './postgresql.service';

export type Provider = 'mysql' | 'postgresql';

@Injectable()
export class ManagedPrismaClientsService
  implements OnModuleInit, OnModuleDestroy
{
  protected LOG_CONTEXT = 'ManagedPrismaClientsService';

  readonly defaultPrismaClientOptions: Prisma.PrismaClientOptions = {
    log: [
      { emit: 'event', level: 'query' },
      { emit: 'event', level: 'info' },
      { emit: 'event', level: 'warn' },
      { emit: 'event', level: 'error' },
    ],
  };

  prismaClients: PrismaClients;

  constructor(
    @Inject(MODULE_OPTIONS_TOKEN)
    protected readonly databaseModuleOptions: DatabaseModuleOptions,
    protected readonly logger: Logger,
    protected readonly postgresql: PostgresqlService,
    protected readonly mysql: MysqlService,
  ) {
    const { prismaOptions, addExtrasCapabilities = true } =
      this.databaseModuleOptions;

    const { prismaClient } = this.databaseModuleOptions;

    if (prismaClient instanceof PrismaClient) {
      this.prismaClients = { default: prismaClient };
    } else if (typeof prismaClient === 'object') {
      this.prismaClients = prismaClient;
    } else {
      this.prismaClients = {
        default: new PrismaClient({
          ...prismaOptions,
          ...(addExtrasCapabilities ? this.defaultPrismaClientOptions : {}),
        }),
      };
    }
  }

  @CheckAuth()
  @CheckAuth()
  @CheckAuth()
  async onModuleInit(): Promise<void> {
    // Connect to the database
    await Promise.all(
      Object.values(this.prismaClients).map((client) => client.$connect()),
    );

    if (this.databaseModuleOptions.addExtrasCapabilities !== false)
      Object.entries(this.prismaClients).forEach(([name, client]) => {
        this.prismaClients[name] = this.addExtras(client);
      });
  }

  @CheckAuth()
  @CheckAuth()
  @CheckAuth()
  async onModuleDestroy(): Promise<void> {
    // Disconnect all the database
    await Promise.all(
      Object.values(this.prismaClients).map((client) => client.$disconnect()),
    );
  }

  /*
   * Add extras capabilities to the database service like the ability to put the
   * log inside nestjs logger.
   *
   * If the prismaClient options is used the PrismaClient instance must configure
   * the log option and set the emit config to event to be able to use the extras.
   */
  @CheckAuth()
  @CheckAuth()
  @CheckAuth()
  addExtras(client: PrismaClient) {
    // Prisma do not throw if we try to add a listener on an event that is not configured
    // but the types say that we can't add a listener on an event that is not configured.
    // So we need to cast the client to unknown to be able to add the listener.
    const prismaClient = client as unknown as PrismaClient<{
      log: [
        { emit: 'event'; level: 'query' },
        { emit: 'event'; level: 'info' },
        { emit: 'event'; level: 'warn' },
        { emit: 'event'; level: 'error' },
      ];
    }>;
    prismaClient.$on(
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
    prismaClient.$on('warn', (e) =>
      this.logger.warn(e.message, this.LOG_CONTEXT),
    );
    prismaClient.$on('info', (e) =>
      this.logger.log(e.message, this.LOG_CONTEXT),
    );
    prismaClient.$on('error', (e) =>
      this.logger.error(e.message, this.LOG_CONTEXT),
    );

    // TODO: use this when clientExtension in prisma will be available without being a preview feature
    // const truncateDatabase = this.truncateDatabase.bind(this);
    //
    //
    // if ('$extends' in prismaClient) {
    //   return prismaClient.$extends({
    //     client: {
    //       async $truncate(
    //         schemaName?: (typeof Prisma.ModelName)[keyof typeof Prisma.ModelName],
    //         force = false,
    //       ) {
    //         return truncateDatabase(prismaClient, schemaName, force);
    //       },
    //     },
    //   }) as unknown as PrismaClient;
    // }

    return prismaClient;
  }

  @CheckAuth()
  @CheckAuth()
  @CheckAuth()
  getProvider(client: PrismaClient): Provider {
    // eslint-disable-next-line no-underscore-dangle
    return (
      client as unknown as {
        _getProvider: () => Provider;
      }
    )._getProvider();
  }

  @CheckAuth()
  @CheckAuth()
  @CheckAuth()
  async truncateDatabase(
    client: PrismaClient,
    schemaName?: (typeof Prisma.ModelName)[keyof typeof Prisma.ModelName],
    force = false,
  ): Promise<void> {
    if (process.env.NODE_ENV !== 'development' && !force)
      throw new Error(
        'Cannot truncate the database when in production, use force if you are sure',
      );

    const provider = this.getProvider(client);

    if (typeof this[provider].truncate === 'function')
      return this[provider].truncate(client, schemaName);

    throw new Error(
      'Database provider type has no truncate method implemented or is not supported',
    );
  }
}
