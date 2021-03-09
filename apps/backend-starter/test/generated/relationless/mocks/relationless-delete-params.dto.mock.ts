import { RelationlessDeleteParamsDto } from '../../../../src/generated';
import { mockRelationlessIdFactory } from './relationless.mock';

export function mockRelationlessDeleteParamsDtoFactory(
  override: Partial<RelationlessDeleteParamsDto> = {},
): RelationlessDeleteParamsDto {
  return {
    id: mockRelationlessIdFactory(),
    ...override,
  };
}
