import { RightCountQueryDto } from '../../../../src/generated';
import { mockRightIdFactory, mockRightNameFactory } from './right.mock';

export function mockRightCountQueryDtoFactory(
  override: Partial<RightCountQueryDto> = {},
): Required<RightCountQueryDto> {
  return {
    id: mockRightIdFactory(),
    name: mockRightNameFactory(),
    ...override,
  };
}
