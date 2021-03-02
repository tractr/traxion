import { Role } from '@prisma/client';
import { random, lorem } from 'faker';

export function mockRoleFactory(override: Partial<Role> = {}): Role {
  return {
    id: random.uuid(),
    name: lorem.words(),
    ...override,
  };
}
