import { 
  Relationless,
} from '@prisma/client';
import {
  random,
  lorem,
} from 'faker';

export function mockRelationlessIdFactory(): Relationless['id'] {
  return random.uuid();
}

export function mockRelationlessNameFactory(): Relationless['name'] {
  return lorem.words();
}

  
export function mockRelationlessFactory(override: Partial< Relationless > = {}): Relationless {
  return {
    id: mockRelationlessIdFactory(),
    name: mockRelationlessNameFactory(),
    ...override,
  };
}

