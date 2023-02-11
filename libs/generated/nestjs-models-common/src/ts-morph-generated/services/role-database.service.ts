import { Prisma, PrismaClient } from '@prisma/client';

import { DATABASE_SERVICE } from '@trxn/nestjs-database';

export type RoleDatabaseService = Prisma.RoleDelegate<undefined>;

export function RoleDatabaseServiceFactory(
  databaseService: PrismaClient,
): Prisma.RoleDelegate<undefined> {
  return databaseService.role;
}

export const RoleDatabaseServiceInject = [DATABASE_SERVICE];
