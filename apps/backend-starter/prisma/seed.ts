import { PrismaClient } from '@prisma/client';

import { seedProfiles } from '../test/generated/profile/mocks';
import { seedRights } from '../test/generated/right/mocks';
import { seedRoles } from '../test/generated/role/mocks';
import { seedUsers } from '../test/generated/user/mocks';

const prisma = new PrismaClient();

async function seed() {
  const rights = await seedRights(prisma, 10);
  const roles = await seedRoles(prisma, 10, rights);
  const users = await seedUsers(prisma, 10, roles);
  const profiles = await seedProfiles(prisma, 10, users);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
