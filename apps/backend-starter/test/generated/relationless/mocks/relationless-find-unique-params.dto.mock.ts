import { RelationlessFindUniqueParamsDto } from '../../../../src/generated';
import { mockRelationlessIdFactory } from './relationless.mock';

export function mockRelationlessFindUniqueParamsDtoFactory(
  override: Partial<RelationlessFindUniqueParamsDto> = {},
): RelationlessFindUniqueParamsDto {
  return {
    id: mockRelationlessIdFactory(),
    ...override,
  };
}
