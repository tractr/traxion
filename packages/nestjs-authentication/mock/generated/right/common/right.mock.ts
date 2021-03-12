import { 
  Right,
} from '@prisma/client';
import {
  random,
  lorem,
} from 'faker';

export function mockRightIdFactory(): Right['id'] {
  return random.uuid();
}

export function mockRightNameFactory(): Right['name'] {
  return lorem.words();
}

  
export function mockRightFactory(override: Partial< Right > = {}): Right {
  return {
    id: mockRightIdFactory(),
    name: mockRightNameFactory(),
    ...override,
  };
}

