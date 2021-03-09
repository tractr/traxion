import { RightDeleteParamsDto } from '../../../../src/generated';
import { mockRightIdFactory } from './right.mock';

export function mockRightDeleteParamsDtoFactory(
  override: Partial<RightDeleteParamsDto> = {},
): RightDeleteParamsDto {
  return {
    id: mockRightIdFactory(),
    ...override,
  };
}
