import { UserUpdateParamsDto } from '../../../../src/generated';
import { mockUserIdFactory } from './user.mock';

export function mockUserUpdateParamsDtoFactory(
  override: Partial<UserUpdateParamsDto> = {},
): UserUpdateParamsDto {
  return {
    id: mockUserIdFactory(),
    ...override,
  };
}
