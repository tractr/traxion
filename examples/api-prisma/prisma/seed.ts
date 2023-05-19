import { randFirstName, randLastName, randText } from '@ngneat/falso';
import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export function createUser({
  email,
  password,
  roles,
  sharedTasksWith = [],
}: {
  email: string;
  password: string;
  roles: Role[];
  sharedTasksWith?: string[];
}) {
  console.info(`Creating user ${email}`);
  return prisma.user.create({
    data: {
      email,
      password: bcrypt.hashSync(password, 10),
      roles,
      profile: {
        create: {
          firstName: randFirstName(),
          lastName: randLastName(),
          bio: randText(),
        },
      },
      tasks: {
        create: [
          {
            title: `${email}'s task`,
            description: randText(),
            status: 'OPEN',
            ...(sharedTasksWith.length > 0 && {
              sharedWith: {
                connect: sharedTasksWith.map((userEmail) => ({
                  email: userEmail,
                })),
              },
            }),
          },
        ],
      },
    },
  });
}

async function main() {
  await prisma.profile.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.task.deleteMany({});

  const users = [
    await createUser({
      email: 'admin@traxion.dev',
      password: 'password',
      roles: [Role.ADMIN],
    }),
    await createUser({
      email: 'user1@traxion.dev',
      password: 'password',
      roles: [Role.USER],
    }),
    await createUser({
      email: 'user2@traxion.dev',
      password: 'password',
      roles: [Role.USER],
      sharedTasksWith: ['user1@traxion.dev'],
    }),
  ];

  console.info(`Seeded ${users.length} users`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
