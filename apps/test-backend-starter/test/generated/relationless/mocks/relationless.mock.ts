import { Relationless } from '@prisma/client';
import { random, lorem } from 'faker';

export function mockRelationlessFactory(
  override: Partial<Relationless> = {}
): Relationless {
  return {
    id: random.uuid(),
    ...override,
  };
}
