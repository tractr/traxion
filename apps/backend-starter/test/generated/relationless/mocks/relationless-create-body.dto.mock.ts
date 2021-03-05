import { RelationlessCreateBodyDto } from '../../../../src/generated';
import {} from './relationless.mock';

export function mockRelationlessCreateBodyDtoFactory(
  override: Partial<RelationlessCreateBodyDto> = {},
): Required<RelationlessCreateBodyDto> {
  return {
    ...override,
  };
}
