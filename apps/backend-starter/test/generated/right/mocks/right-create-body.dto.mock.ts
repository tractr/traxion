import { RightCreateBodyDto } from '../../../../src/generated';
import { mockRightNameFactory } from './right.mock';

export function mockRightCreateBodyDtoFactory(
  override: Partial<RightCreateBodyDto> = {},
): RightCreateBodyDto {
  return {
    name: mockRightNameFactory(),
    ...override,
  };
}
