import { RelationlessCountQueryDto } from '../../../../src/generated';
import { mockRelationlessIdFactory } from './relationless.mock';

export function mockRelationlessCountQueryDtoFactory(
  override: Partial<RelationlessCountQueryDto> = {},
): RelationlessCountQueryDto {
  return {
    id: mockRelationlessIdFactory(),
    ...override,
  };
}
