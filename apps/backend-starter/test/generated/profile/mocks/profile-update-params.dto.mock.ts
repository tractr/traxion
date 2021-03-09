import { ProfileUpdateParamsDto } from '../../../../src/generated';
import { mockProfileIdFactory } from './profile.mock';

export function mockProfileUpdateParamsDtoFactory(
  override: Partial<ProfileUpdateParamsDto> = {},
): ProfileUpdateParamsDto {
  return {
    id: mockProfileIdFactory(),
    ...override,
  };
}
