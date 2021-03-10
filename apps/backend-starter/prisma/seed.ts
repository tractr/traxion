import { PrismaClient } from '@prisma/client';
import { seedProfiles } from '@generated-mock/profile/common';
import { seedRights } from '@generated-mock/right/common';
import { seedRoles } from '@generated-mock/role/common';
import { seedUsers } from '@generated-mock/user/common';

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
  .finally(
    async (): Promise<void> => {
      await prisma.$disconnect();
    },
  );
