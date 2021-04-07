import { MessageFindManyQueryDto } from '../../dtos';

import {
  mockMessageIdFactory,
  mockMessageTextFactory,
} from '@generated/models';

export function mockMessageFindManyQueryDtoFactory(
  override: Partial<MessageFindManyQueryDto> = {}
): Required< MessageFindManyQueryDto> {
  return {
    id: mockMessageIdFactory(),
    text: mockMessageTextFactory(),
    populate: [
      'tags',
      'questions',
    ],
    sort: 'id',
    order: 'asc',
    take: 20,
    skip: 0,
    ...override,
  };
}
