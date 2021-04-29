import { VariableFindManyQueryDto } from '../../dtos';

import {
  mockVariableIdFactory,
} from '@generated/models';

export function mockVariableFindManyQueryDtoFactory(
  override: Partial<VariableFindManyQueryDto> = {}
): Required< VariableFindManyQueryDto> {
  return {
    id: mockVariableIdFactory(),
    populate: [
      'openQuestion',
      'answer',
    ],
    sort: 'id',
    order: 'asc',
    take: 20,
    skip: 0,
    ...override,
  };
}
