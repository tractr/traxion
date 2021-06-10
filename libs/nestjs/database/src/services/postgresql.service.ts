/* eslint-disable no-await-in-loop */
import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PostgresqlService {
  async truncate(
    prisma: PrismaClient,
    schemaName: string = process.env.TRACTR_POSTGRESQL_SCHEMA || 'public',
  ) {
    if (!schemaName)
      throw new Error(
        'Could not empty database. No shema name has been provided',
      );
    // Special fast path to drop data from a postgres database.
    // This is an optimization which is particularly crucial in a unit testing context.
    // This code path takes milliseconds, vs ~7 seconds for a migrate reset + db push
    for (const { tablename } of await prisma.$queryRaw(
      `SELECT tablename FROM pg_tables WHERE schemaname='${schemaName}'`,
    )) {
      await prisma.$queryRaw(
        `TRUNCATE TABLE "${schemaName}"."${tablename as string}" CASCADE;`,
      );
    }
    for (const { relname } of await prisma.$queryRaw(
      `SELECT c.relname FROM pg_class AS c JOIN pg_namespace AS n ON c.relnamespace = n.oid WHERE c.relkind='S' AND n.nspname='${schemaName}';`,
    )) {
      await prisma.$queryRaw(
        `ALTER SEQUENCE "${schemaName}"."${relname as string}" RESTART WITH 1;`,
      );
    }
  }
}
