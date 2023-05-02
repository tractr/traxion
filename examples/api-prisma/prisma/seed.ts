import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const users = await prisma.user.upsert({
    where: {
      email: 'admin@traxion.dev',
    },
    update: {},
    create: {
      email: 'admin@traxion.dev',
      name: 'Admin',
      userProfile: {
        connectOrCreate: {
          where: {
            id: 1,
          },
          create: {
            id: 1,
            address: 'Traxion Tech Inc.',
          },
        },
      },
      role: {
        connectOrCreate: {
          where: {
            id: 1,
          },
          create: {
            id: 1,
            name: 'Admin',
            rights: {
              connectOrCreate: [
                {
                  where: {
                    id: 1,
                  },
                  create: {
                    id: 1,
                    name: 'Create',
                  },
                },
                {
                  where: {
                    id: 2,
                  },
                  create: {
                    id: 2,
                    name: 'Update',
                  },
                },
              ],
            },
          },
        },
      },
    },
  });

  console.info(`Created user with id: ${users.id}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
