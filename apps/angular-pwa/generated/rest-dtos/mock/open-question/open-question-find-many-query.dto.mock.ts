import { OpenQuestionFindManyQueryDto } from '../../dtos';

import {
  mockOpenQuestionIdFactory,
  mockOpenQuestionTextFactory,
  mockOpenQuestionKeyFactory,
} from '@generated/models';

export function mockOpenQuestionFindManyQueryDtoFactory(
  override: Partial<OpenQuestionFindManyQueryDto> = {}
): Required< OpenQuestionFindManyQueryDto> {
  return {
    id: mockOpenQuestionIdFactory(),
    text: mockOpenQuestionTextFactory(),
    key: mockOpenQuestionKeyFactory(),
    populate: [
      'question',
          'variableAsOpenQuestion',
    ],
    sort: 'id',
    order: 'asc',
    take: 20,
    skip: 0,
    ...override,
  };
}
