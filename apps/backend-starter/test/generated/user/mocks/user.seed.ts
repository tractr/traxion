import { PrismaClient, Role, User } from '@prisma/client';
import { random } from 'faker';

import { mockUserFactory } from './user.mock';

export async function insertUsers(
  prisma: PrismaClient,
  users: User[],
): Promise<User[]> {
  await prisma.user.createMany({ data: users, skipDuplicates: true });
  return users;
}

export function generateUserSeeds(quantity: number, roles: Role[]): User[] {
  return [...Array(quantity)].map(() =>
    mockUserFactory({
      roleId: random.arrayElement(roles).id,
    }),
  );
}

export async function seedUsers(
  prisma: PrismaClient,
  quantity: number,
  roles: Role[],
): Promise<User[]> {
  const seeds = generateUserSeeds(quantity, roles);
  await insertUsers(prisma, seeds);
  return seeds;
}
