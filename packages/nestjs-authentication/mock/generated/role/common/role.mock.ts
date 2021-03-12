import { 
  Role,
} from '@prisma/client';
import {
  random,
  lorem,
} from 'faker';

export function mockRoleIdFactory(): Role['id'] {
  return random.uuid();
}

export function mockRoleNameFactory(): Role['name'] {
  return lorem.words();
}

export function mockRoleRightsIdsFactory(): string[] {
  return [...Array(3)].map(() => random.uuid());
}

  
export function mockRoleFactory(override: Partial< Role > = {}): Role {
  return {
    id: mockRoleIdFactory(),
    name: mockRoleNameFactory(),
    ...override,
  };
}

