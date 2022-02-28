import { PrismaClient, UserRoles } from '@prisma/client';
import * as bcrypt from 'bcrypt';

export async function seed() {
  const db = new PrismaClient();
  const user = await db.user.findFirst({
    where: {
      email: 'admin@traxion.com',
    },
  });

  if (!user) throw new Error('user not found');

  await db.user.upsert({
    where: {
      id: user.id,
    },
    update: {
      password: await bcrypt.hash('password', 10),
    },
    create: {
      email: 'admin@traxion.com',
      password: await bcrypt.hash('password', 10),
      roles: [UserRoles.admin],
      createdAt: new Date(),
      name: 'Traxion admin',
      listObject: [],
      object: {},
    },
  });
}
