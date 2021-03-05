import { RelationlessFindManyQueryDto } from '../../../../src/generated';
import { mockRelationlessIdFactory } from './relationless.mock';

export function mockRelationlessFindManyQueryDtoFactory(
  override: Partial<RelationlessFindManyQueryDto> = {},
): RelationlessFindManyQueryDto {
  return {
    id: mockRelationlessIdFactory(),
    sort: 'id',
    order: 'asc',
    take: 20,
    skip: 0,
    ...override,
  };
}
