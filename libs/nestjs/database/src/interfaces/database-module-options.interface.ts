import { Prisma, PrismaClient } from '@prisma/client';

export type PrismaClients = Record<string, PrismaClient> & {
  default: PrismaClient;
};

/**
 * The public interface of the DatabaseModule.
 */
export type DatabaseModuleOptions = {
  /**
   * The prisma client to use.
   * If this is provided, prismaOptions is ignored.
   * @default new PrismaClient()
   */
  prismaClient?: PrismaClients;

  /*
   * The prisma options to use when creating a new prisma client.
   * This is not used if prismaClient is provided.
   * @default {}
   */
  prismaOptions?: Prisma.PrismaClientOptions;

  /**
   * Add extras capabilities to the database service like the ability to put the log inside nestjs logger.
   */
  addExtrasCapabilities?: boolean;
};
