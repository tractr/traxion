/* eslint-disable no-await-in-loop */
import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';

@Injectable()
export class MysqlService {
  async truncate(
    prisma: PrismaClient,
    schemaName: string = process.env.TRACTR_POSTGRESQL_SCHEMA || 'public',
  ) {
    const transactions: Prisma.PrismaPromise<unknown>[] = [];
    transactions.push(prisma.$executeRaw`SET FOREIGN_KEY_CHECKS = 0;`);

    const tables: { TABLE_NAME: string }[] =
      await prisma.$queryRaw`SELECT TABLE_NAME from information_schema.TABLES WHERE TABLE_SCHEMA = '${schemaName}';`;

    for (const { TABLE_NAME } of tables) {
      if (TABLE_NAME !== '_prisma_migrations') {
        try {
          transactions.push(prisma.$executeRaw`TRUNCATE ${TABLE_NAME};`);
        } catch (error) {
          console.error({ error });
        }
      }
    }

    transactions.push(prisma.$executeRaw`SET FOREIGN_KEY_CHECKS = 1;`);

    try {
      await prisma.$transaction(transactions);
    } catch (error) {
      console.error({ error });
    }
  }
}
