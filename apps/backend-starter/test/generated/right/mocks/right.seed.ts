import { PrismaClient, Right } from '@prisma/client';
import { random } from 'faker';

import { mockRightFactory } from './right.mock';

export async function insertRights(
  prisma: PrismaClient,
  rights: Right[],
): Promise<Right[]> {
  await prisma.right.createMany({ data: rights, skipDuplicates: true });
  return rights;
}

export function generateRightSeeds(quantity: number): Right[] {
  return [...Array(quantity)].map(() => mockRightFactory());
}

export async function seedRights(
  prisma: PrismaClient,
  quantity: number,
): Promise<Right[]> {
  const seeds = generateRightSeeds(quantity);
  await insertRights(prisma, seeds);
  return seeds;
}
