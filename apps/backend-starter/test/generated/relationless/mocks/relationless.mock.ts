import { Relationless } from '@prisma/client';
import { random } from 'faker';

export function mockRelationlessIdFactory(): Relationless['id'] {
  return random.uuid();
}

export function mockRelationlessFactory(
  override: Partial<Relationless> = {},
): Relationless {
  return {
    id: mockRelationlessIdFactory(),
    ...override,
  };
}
