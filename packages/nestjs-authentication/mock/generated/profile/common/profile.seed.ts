import { 
  PrismaClient,
  Profile,
  User,
} from '@prisma/client';
import { random } from 'faker';

import { mockProfileFactory } from './profile.mock';

  
export async function insertProfiles(prisma: PrismaClient, profiles: Profile[]): Promise< Profile[]> {
  await prisma.profile.createMany({ data: profiles, skipDuplicates: true });
  return profiles;
}

export function generateProfileSeeds(
  quantity: number,
  owners: User[],
): Profile[] {
  return [...Array(quantity)].map(() =>
    mockProfileFactory(
    {
        ownerId: random.arrayElement(owners).id
    }
    )
  );
}

export async function seedProfiles(
  prisma: PrismaClient,
  quantity: number,
  owners: User[],
): Promise< Profile[]> {
  const seeds = generateProfileSeeds(
    quantity,
    owners,
  );
  await insertProfiles(prisma, seeds);
  return seeds;
}
