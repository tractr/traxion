import { Right } from '@prisma/client';
import { random, lorem } from 'faker';

export function mockRightFactory(override: Partial<Right> = {}): Right {
  return {
    id: random.uuid(),
    name: lorem.words(),
    ...override,
  };
}
