import { RightUpsertBodyDto } from '../../../../src/generated';
import { mockRightNameFactory } from './right.mock';

export function mockRightUpsertBodyDtoFactory(
  override: Partial<RightUpsertBodyDto> = {},
): Required<RightUpsertBodyDto> {
  return {
    name: mockRightNameFactory(),
    ...override,
  };
}
