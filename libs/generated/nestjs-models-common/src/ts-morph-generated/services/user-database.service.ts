import { Prisma, PrismaClient } from '@prisma/client';

import { DATABASE_SERVICE } from '@trxn/nestjs-database';

export type UserDatabaseService = Prisma.UserDelegate<undefined>;

export function UserDatabaseServiceFactory(
  databaseService: PrismaClient,
): Prisma.UserDelegate<undefined> {
  return databaseService.user;
}

export const UserDatabaseServiceInject = [DATABASE_SERVICE];
