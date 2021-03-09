import { RelationlessUpsertBodyDto } from '../../../../src/generated';
import { mockRelationlessNameFactory } from './relationless.mock';

export function mockRelationlessUpsertBodyDtoFactory(
  override: Partial<RelationlessUpsertBodyDto> = {},
): Required<RelationlessUpsertBodyDto> {
  return {
    name: mockRelationlessNameFactory(),
    ...override,
  };
}
