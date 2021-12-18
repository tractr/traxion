import { NestFactory } from '@nestjs/core';
import { UserRoles } from '@prisma/client';
import * as bcrypt from 'bcrypt';

// eslint-disable-next-line
import { AppModule } from '../../../apps/api/src/app/app.module';

import { seedUsers } from '@generated/nestjs-models-common/mock';
import { Logger } from '@tractr/nestjs-core';
import { DatabaseService } from '@tractr/nestjs-database';

export async function seed() {
  // Instanciate nest app
  const app = await NestFactory.create(AppModule);

  // Set custom logger service
  const logger = await app.resolve(Logger);
  app.useLogger(logger);
  logger.setContext('prisma:seed');

  try {
    const db = app.get(DatabaseService);
    // // Seed a user
    await seedUsers(db, 10);

    const user = await db.user.findFirst();

    if (!user) throw new Error('user not found');

    await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        ...user,
        email: 'admin@traxion.com',
        password: await bcrypt.hash('traxion', 10),
        roles: [UserRoles.admin],
      },
    });

    logger.debug(`Users imported`);
  } catch (e) {
    logger.error(e);
    throw e;
  } finally {
    await app.close();
  }
}
