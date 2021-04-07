import { 
  Tag,
} from '../models';
import {
  random,
  lorem,
} from 'faker';

export function mockTagIdFactory(): Tag['id'] {
  return random.uuid();
}

export function mockTagLabelFactory(): Tag['label'] {
  return lorem.words();
}

  
export function mockTagFactory(override: Partial< Tag > = {}): Tag {
  return {
    id: mockTagIdFactory(),
    label: mockTagLabelFactory(),
    ...override,
  };
}

