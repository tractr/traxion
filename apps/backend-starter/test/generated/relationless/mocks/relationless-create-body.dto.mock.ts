import { RelationlessCreateBodyDto } from '../../../../src/generated';
import {} from './relationless.mock';

export function mockRelationlessCreateBodyDtoFactory(
  override: Partial<RelationlessCreateBodyDto> = {},
): RelationlessCreateBodyDto {
  return {
    ...override,
  };
}
