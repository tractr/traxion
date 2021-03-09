import { RightFindManyQueryDto } from '../../../../src/generated';
import { mockRightIdFactory, mockRightNameFactory } from './right.mock';

export function mockRightFindManyQueryDtoFactory(
  override: Partial<RightFindManyQueryDto> = {},
): Required<RightFindManyQueryDto> {
  return {
    id: mockRightIdFactory(),
    name: mockRightNameFactory(),
    populate: ['roleAsRights'],
    sort: 'id',
    order: 'asc',
    take: 20,
    skip: 0,
    ...override,
  };
}
