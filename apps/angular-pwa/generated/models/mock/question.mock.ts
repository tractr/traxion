import { 
  Question,
} from '../models';
import {
  datatype,
  lorem,
} from 'faker';

export function mockQuestionIdFactory(): Question['id'] {
  return datatype.uuid();
}

export function mockQuestionTitleFactory(): Question['title'] {
  return lorem.words();
}

export function mockQuestionTextFactory(): Question['text'] {
  return lorem.words();
}

export function mockQuestionParentQuestionIdFactory(): NonNullable<Question['parentQuestionId']> {
  return datatype.uuid();
}

export function mockQuestionTagsIdsFactory(): string[] {
  return [...Array(3)].map(() => datatype.uuid());
}

  
export function mockQuestionFactory(override: Partial< Question > = {}): Question {
  return {
    id: mockQuestionIdFactory(),
    title: mockQuestionTitleFactory(),
    text: mockQuestionTextFactory(),
    parentQuestionId: mockQuestionParentQuestionIdFactory(),
    ...override,
  };
}

