import { RelationlessUpsertParamsDto } from '../../../../src/generated';
import { mockRelationlessIdFactory } from './relationless.mock';

export function mockRelationlessUpsertParamsDtoFactory(
  override: Partial<RelationlessUpsertParamsDto> = {},
): RelationlessUpsertParamsDto {
  return {
    id: mockRelationlessIdFactory(),
    ...override,
  };
}
