import { RelationlessUpdateBodyDto } from '../../../../src/generated';
import {} from './relationless.mock';

export function mockRelationlessUpdateBodyDtoFactory(
  override: Partial<RelationlessUpdateBodyDto> = {},
): Required<RelationlessUpdateBodyDto> {
  return {
    ...override,
  };
}
