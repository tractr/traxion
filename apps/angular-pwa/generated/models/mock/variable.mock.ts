import { 
  Variable,
} from '../models';
import {
  datatype,
  lorem,
} from 'faker';

export function mockVariableIdFactory(): Variable['id'] {
  return datatype.uuid();
}

export function mockVariableValueFactory(): Variable['value'] {
  return lorem.words();
}

export function mockVariableOpenQuestionIdFactory(): Variable['openQuestionId'] {
  return datatype.uuid();
}

export function mockVariableAnswerIdFactory(): Variable['answerId'] {
  return datatype.uuid();
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

