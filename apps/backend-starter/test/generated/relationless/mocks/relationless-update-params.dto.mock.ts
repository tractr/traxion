import { RelationlessUpdateParamsDto } from '../../../../src/generated';
import { mockRelationlessIdFactory } from './relationless.mock';

export function mockRelationlessUpdateParamsDtoFactory(
  override: Partial<RelationlessUpdateParamsDto> = {},
): RelationlessUpdateParamsDto {
  return {
    id: mockRelationlessIdFactory(),
    ...override,
  };
}
