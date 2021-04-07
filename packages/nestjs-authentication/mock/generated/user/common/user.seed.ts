import { 
  PrismaClient,
  User,
} from '@prisma/client';

import { mockUserFactory } from './user.mock';

  
export async function insertUsers(prisma: PrismaClient, users: User[]): Promise< User[]> {
  await prisma.user.createMany({ data: users, skipDuplicates: true });
  return users;
}

export function generateUserSeeds(
  quantity: number,
): User[] {
  return [...Array(quantity)].map(() =>
    mockUserFactory(
    )
  );
}

export async function seedUsers(
  prisma: PrismaClient,
  quantity: number,
): Promise< User[]> {
  const seeds = generateUserSeeds(
    quantity,
  );
  await insertUsers(prisma, seeds);
  return seeds;
}
