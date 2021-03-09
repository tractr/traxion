import { UserDeleteParamsDto } from '../../../../src/generated';
import { mockUserIdFactory } from './user.mock';

export function mockUserDeleteParamsDtoFactory(
  override: Partial<UserDeleteParamsDto> = {},
): UserDeleteParamsDto {
  return {
    id: mockUserIdFactory(),
    ...override,
  };
}
