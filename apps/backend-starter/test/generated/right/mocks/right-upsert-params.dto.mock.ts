import { RightUpsertParamsDto } from '../../../../src/generated';
import { mockRightIdFactory } from './right.mock';

export function mockRightUpsertParamsDtoFactory(
  override: Partial<RightUpsertParamsDto> = {},
): RightUpsertParamsDto {
  return {
    id: mockRightIdFactory(),
    ...override,
  };
}
