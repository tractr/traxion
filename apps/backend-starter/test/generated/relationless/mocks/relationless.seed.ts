import { PrismaClient, Relationless } from '@prisma/client';

import { mockRelationlessFactory } from './relationless.mock';

export async function insertRelationlesss(
  prisma: PrismaClient,
  relationlesss: Relationless[],
): Promise<Relationless[]> {
  await prisma.relationless.createMany({
    data: relationlesss,
    skipDuplicates: true,
  });
  return relationlesss;
}

export function generateRelationlessSeeds(quantity: number): Relationless[] {
  return [...Array(quantity)].map(() => mockRelationlessFactory());
}

export async function seedRelationlesss(
  prisma: PrismaClient,
  quantity: number,
): Promise<Relationless[]> {
  const seeds = generateRelationlessSeeds(quantity);
  await insertRelationlesss(prisma, seeds);
  return seeds;
}
