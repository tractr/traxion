import { RightUpdateParamsDto } from '../../../../src/generated';
import { mockRightIdFactory } from './right.mock';

export function mockRightUpdateParamsDtoFactory(
  override: Partial<RightUpdateParamsDto> = {},
): RightUpdateParamsDto {
  return {
    id: mockRightIdFactory(),
    ...override,
  };
}
