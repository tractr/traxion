import { TagFindManyQueryDto } from '../../dtos';

import {
  mockTagIdFactory,
  mockTagLabelFactory,
} from '@generated/models';

export function mockTagFindManyQueryDtoFactory(
  override: Partial<TagFindManyQueryDto> = {}
): Required< TagFindManyQueryDto> {
  return {
    id: mockTagIdFactory(),
    label: mockTagLabelFactory(),
    populate: [
          'answerAsTags',
          'messageAsTags',
          'questionAsTags',
    ],
    sort: 'id',
    order: 'asc',
    take: 20,
    skip: 0,
    ...override,
  };
}
