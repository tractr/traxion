import { 
  PrismaClient,
  Role,
  Right,
} from '@prisma/client';
import { random } from 'faker';

import { mockRoleFactory } from './role.mock';

export interface RoleSeed extends Role {
  rights: string[];
}

export async function insertRoles(prisma: PrismaClient, roles: RoleSeed[]): Promise< Role[]> {
  return Promise.all(
    roles.map((role) =>
      prisma.role.create({
        data: {
          ...role,
          rights: {
            connect: role.rights.map((id) => ({ id })),
          },
        },
      }),
    ),
  );
}

export function generateRoleSeeds(
  quantity: number,
  rights: Right[],
): RoleSeed[] {
  return [...Array(quantity)].map(() =>
  {
    const role: Role = mockRoleFactory(
    );
    const seed: RoleSeed = {
      ...role,
      rights: random.arrayElements(rights, 3).map(({id}) => id),
    };
    return seed;
  }
  );
}

export async function seedRoles(
  prisma: PrismaClient,
  quantity: number,
  rights: Right[],
): Promise< Role[]> {
  const seeds = generateRoleSeeds(
    quantity,
    rights,
  );
  await insertRoles(prisma, seeds);
  return seeds;
}
