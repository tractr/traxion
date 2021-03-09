import { ProfileFindUniqueParamsDto } from '../../../../src/generated';
import { mockProfileIdFactory } from './profile.mock';

export function mockProfileFindUniqueParamsDtoFactory(
  override: Partial<ProfileFindUniqueParamsDto> = {},
): ProfileFindUniqueParamsDto {
  return {
    id: mockProfileIdFactory(),
    ...override,
  };
}
