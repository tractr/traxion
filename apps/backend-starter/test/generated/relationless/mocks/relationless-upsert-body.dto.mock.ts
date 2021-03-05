import { RelationlessUpsertBodyDto } from '../../../../src/generated';
import {} from './relationless.mock';

export function mockRelationlessUpsertBodyDtoFactory(
  override: Partial<RelationlessUpsertBodyDto> = {},
): Required<RelationlessUpsertBodyDto> {
  return {
    ...override,
  };
}
