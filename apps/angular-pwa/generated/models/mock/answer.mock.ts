import { 
  Answer,
} from '../models';
import {
  datatype,
} from 'faker';

export function mockAnswerIdFactory(): Answer['id'] {
  return datatype.uuid();
}

export function mockAnswerUserIdFactory(): Answer['userId'] {
  return datatype.uuid();
}

export function mockAnswerQuestionIdFactory(): Answer['questionId'] {
  return datatype.uuid();
}

export function mockAnswerTagsIdsFactory(): string[] {
  return [...Array(3)].map(() => datatype.uuid());
}

  
export function mockAnswerFactory(override: Partial< Answer > = {}): Answer {
  return {
    id: mockAnswerIdFactory(),
    userId: mockAnswerUserIdFactory(),
    questionId: mockAnswerQuestionIdFactory(),
    ...override,
  };
}

