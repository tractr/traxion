import { 
  OpenQuestion,
} from '../models';
import {
  datatype,
  lorem,
} from 'faker';

export function mockOpenQuestionIdFactory(): OpenQuestion['id'] {
  return datatype.uuid();
}

export function mockOpenQuestionTextFactory(): OpenQuestion['text'] {
  return lorem.words();
}

export function mockOpenQuestionKeyFactory(): OpenQuestion['key'] {
  return lorem.words();
}

export function mockOpenQuestionQuestionIdFactory(): OpenQuestion['questionId'] {
  return datatype.uuid();
}

  
export function mockOpenQuestionFactory(override: Partial< OpenQuestion > = {}): OpenQuestion {
  return {
    id: mockOpenQuestionIdFactory(),
    text: mockOpenQuestionTextFactory(),
    key: mockOpenQuestionKeyFactory(),
    questionId: mockOpenQuestionQuestionIdFactory(),
    ...override,
  };
}

