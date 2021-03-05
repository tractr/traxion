import { ProfileUpsertParamsDto } from '../../../../src/generated';
import { mockProfileIdFactory } from './profile.mock';

export function mockProfileUpsertParamsDtoFactory(
  override: Partial<ProfileUpsertParamsDto> = {},
): ProfileUpsertParamsDto {
  return {
    id: mockProfileIdFactory(),
    ...override,
  };
}
