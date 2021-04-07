import { 
  Variable,
} from '../models';
import {
  random,
  lorem,
} from 'faker';

export function mockVariableIdFactory(): Variable['id'] {
  return random.uuid();
}

export function mockVariableValueFactory(): Variable['value'] {
  return lorem.words();
}

export function mockVariableOpenQuestionIdFactory(): Variable['openQuestionId'] {
  return random.uuid();
}

export function mockVariableAnswerIdFactory(): Variable['answerId'] {
  return random.uuid();
}

  
export function mockVariableFactory(override: Partial< Variable > = {}): Variable {
  return {
    id: mockVariableIdFactory(),
    value: mockVariableValueFactory(),
    openQuestionId: mockVariableOpenQuestionIdFactory(),
    answerId: mockVariableAnswerIdFactory(),
    ...override,
  };
}

