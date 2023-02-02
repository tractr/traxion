import { Prisma, PrismaClient } from '@prisma/client';

/**
 * The public interface of the DatabaseModule.
 */
export type DatabaseModuleOptions = {
  /**
   * The prisma client instance to use under the hood.
   * If not provided, a new instance will be created.
   * @default new PrismaClient(options.prismaOptions)
   */
  prismaClient?: PrismaClient;

  /*
   * The prisma options to use when creating a new prisma client.
   * This is not used if prismaClient is provided.
   * @default {}
   */
  prismaOptions?: Prisma.PrismaClientOptions;

  /**
   * Add extras capabilities to the database service like the ability to put the log inside nestjs logger.
   */
  addExtras?: boolean;
};
