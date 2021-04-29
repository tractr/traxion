import { AnswerFindManyQueryDto } from '../../dtos';

import {
  mockAnswerIdFactory,
} from '@generated/models';

export function mockAnswerFindManyQueryDtoFactory(
  override: Partial<AnswerFindManyQueryDto> = {}
): Required< AnswerFindManyQueryDto> {
  return {
    id: mockAnswerIdFactory(),
    populate: [
      'user',
      'question',
      'tags',
          'variableAsAnswer',
    ],
    sort: 'id',
    order: 'asc',
    take: 20,
    skip: 0,
    ...override,
  };
}
