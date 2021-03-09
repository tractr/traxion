import { RelationlessUpdateBodyDto } from '../../../../src/generated';
import { mockRelationlessNameFactory } from './relationless.mock';

export function mockRelationlessUpdateBodyDtoFactory(
  override: Partial<RelationlessUpdateBodyDto> = {},
): Required<RelationlessUpdateBodyDto> {
  return {
    name: mockRelationlessNameFactory(),
    ...override,
  };
}
