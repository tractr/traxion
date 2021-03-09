import { RightCreateBodyDto } from '../../../../src/generated';
import { mockRightNameFactory } from './right.mock';

export function mockRightCreateBodyDtoFactory(
  override: Partial<RightCreateBodyDto> = {},
): Required<RightCreateBodyDto> {
  return {
    name: mockRightNameFactory(),
    ...override,
  };
}
