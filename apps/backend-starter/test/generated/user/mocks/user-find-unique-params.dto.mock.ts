import { UserFindUniqueParamsDto } from '../../../../src/generated';
import { mockUserIdFactory } from './user.mock';

export function mockUserFindUniqueParamsDtoFactory(
  override: Partial<UserFindUniqueParamsDto> = {},
): UserFindUniqueParamsDto {
  return {
    id: mockUserIdFactory(),
    ...override,
  };
}
