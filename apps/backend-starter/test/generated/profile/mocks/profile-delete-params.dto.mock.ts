import { ProfileDeleteParamsDto } from '../../../../src/generated';
import { mockProfileIdFactory } from './profile.mock';

export function mockProfileDeleteParamsDtoFactory(
  override: Partial<ProfileDeleteParamsDto> = {},
): ProfileDeleteParamsDto {
  return {
    id: mockProfileIdFactory(),
    ...override,
  };
}
