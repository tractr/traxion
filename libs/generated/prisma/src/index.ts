import { PrismaClient, UserRoles } from '@prisma/client';
import * as bcrypt from 'bcrypt';

export async function seed() {
  const db = new PrismaClient();
  let user = await db.user.findFirst({
    where: {
      email: 'admin@traxion.com',
    },
  });

  const password = await bcrypt.hash('password', 10);

  if (!user) {
    user = await db.user.create({
      data: {
        email: 'admin@traxion.com',
        password,
        roles: [UserRoles.admin],
        createdAt: new Date(),
        name: 'Traxion admin',
        listObject: [],
        object: {},
      },
    });
  }

  await db.user.update({
    where: {
      id: user?.id || '',
    },
    data: {
      password,
      enterprises: {
        connectOrCreate: {
          where: { name: 'Traxion' },
          create: { name: 'Traxion' },
        },
      },
    },
  });
}
