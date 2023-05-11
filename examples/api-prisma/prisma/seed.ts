import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export function createUser({
  email,
  password,
  name,
  address,
  role,
}: {
  email: string;
  password: string;
  name: string;
  address: string;
  role: string;
}) {
  console.info(`Creating user ${email}`);
  return prisma.user.create({
    data: {
      email,
      password: bcrypt.hashSync(password, 10),
      name,
      userProfile: {
        create: {
          address,
        },
      },
      role: {
        connectOrCreate: {
          where: {
            name: role,
          },
          create: {
            name: role,
          },
        },
      },
    },
  });
}

async function main() {
  await prisma.profile.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.role.deleteMany({});
  const users = [
    await createUser({
      email: 'admin@traxion.dev',
      password: 'password',
      name: 'Admin',
      address: 'Admin Address',
      role: 'admin',
    }),
    await createUser({
      email: 'user1@traxion.dev',
      password: 'password',
      name: 'User 1',
      address: 'User 1 Address',
      role: 'user',
    }),
    await createUser({
      email: 'user2@traxion.dev',
      password: 'password',
      name: 'User 2',
      address: 'User 2 Address',
      role: 'user',
    }),
  ];

  console.info(`Seeded ${users.length} users`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
