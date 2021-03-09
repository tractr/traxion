import { RelationlessCreateBodyDto } from '../../../../src/generated';
import { mockRelationlessNameFactory } from './relationless.mock';

export function mockRelationlessCreateBodyDtoFactory(
  override: Partial<RelationlessCreateBodyDto> = {},
): Required<RelationlessCreateBodyDto> {
  return {
    name: mockRelationlessNameFactory(),
    ...override,
  };
}
