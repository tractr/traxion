import { PrismaClient } from '@prisma/client';

// import { seedProfiles } from '../mock/generated/profile/common';
// import { seedRights } from '../mock/generated/right/common';
// import { seedRoles } from '../mock/generated/role/common';
// import { seedUsers } from '../mock/generated/user/common';

const prisma = new PrismaClient();

async function seed() {
  try {
    //     const rights = await seedRights(prisma, 10);
    //     const roles = await seedRoles(prisma, 10, rights);
    //     const users = await seedUsers(prisma, 10, roles);
    //     const profiles = await seedProfiles(prisma, 10, users);
    console.log('coucou');
  } catch (e) {
    console.log(e);
  } finally {
    await prisma.$disconnect();
  }
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
