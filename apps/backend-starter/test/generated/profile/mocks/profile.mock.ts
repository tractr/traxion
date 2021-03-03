import { Profile, ProfileGender } from '@prisma/client';
import { random, lorem } from 'faker';

export function mockProfileFactory(override: Partial<Profile> = {}): Profile {
  return {
    id: random.uuid(),
    address: lorem.words(),
    phone: lorem.words(),
    gender: random.arrayElement(Object.values(ProfileGender)),
    ownerId: random.uuid(),
    ...override,
  };
}
