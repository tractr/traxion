import { RightFindUniqueParamsDto } from '../../../../src/generated';
import { mockRightIdFactory } from './right.mock';

export function mockRightFindUniqueParamsDtoFactory(
  override: Partial<RightFindUniqueParamsDto> = {},
): RightFindUniqueParamsDto {
  return {
    id: mockRightIdFactory(),
    ...override,
  };
}
