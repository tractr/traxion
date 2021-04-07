import { 
  Answer,
} from '../models';
import {
  random,
} from 'faker';

export function mockAnswerIdFactory(): Answer['id'] {
  return random.uuid();
}

export function mockAnswerUserIdFactory(): Answer['userId'] {
  return random.uuid();
}

export function mockAnswerQuestionIdFactory(): Answer['questionId'] {
  return random.uuid();
}

export function mockAnswerTagsIdsFactory(): string[] {
  return [...Array(3)].map(() => random.uuid());
}

  
export function mockAnswerFactory(override: Partial< Answer > = {}): Answer {
  return {
    id: mockAnswerIdFactory(),
    userId: mockAnswerUserIdFactory(),
    questionId: mockAnswerQuestionIdFactory(),
    ...override,
  };
}

