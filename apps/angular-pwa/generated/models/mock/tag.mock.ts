import { 
  Tag,
} from '../models';
import {
  datatype,
  lorem,
} from 'faker';

export function mockTagIdFactory(): Tag['id'] {
  return datatype.uuid();
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

