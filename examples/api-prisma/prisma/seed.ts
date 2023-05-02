import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function seed() {
  await prisma.user.upsert({
    where: { email: 'admin@traxion.dev' },
    update: {},
    create: {
      email: 'admin@traxion.dev',
      name: 'Admin',
      password: bcrypt.hashSync('password', 10),
      role: {
        connectOrCreate: {
          where: {
            id: 1,
          },
          create: {
            id: 1,
            name: 'role 1',
          },
        },
      },
    },
  });
}

seed().catch((e) => {
  console.error(e);
});
