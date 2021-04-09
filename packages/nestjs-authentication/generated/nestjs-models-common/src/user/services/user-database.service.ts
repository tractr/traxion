import { DatabaseService } from '@tractr/nestjs-database';

import { Prisma } from '@prisma/client';

export type UserDatabaseService = Prisma.UserDelegate<Prisma.False>

export function userDatabaseServiceFactory(
  databaseService: DatabaseService,
): Prisma.UserDelegate<Prisma.False> {
  return databaseService.user;
}

export const userDatabaseServiceInject = [DatabaseService];
