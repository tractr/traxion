import { RightUpdateBodyDto } from '../../../../src/generated';
import { mockRightNameFactory } from './right.mock';

export function mockRightUpdateBodyDtoFactory(
  override: Partial<RightUpdateBodyDto> = {},
): Required<RightUpdateBodyDto> {
  return {
    name: mockRightNameFactory(),
    ...override,
  };
}
