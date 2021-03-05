import { UserUpdateBodyDto } from '../../../../src/generated';
import {
  mockUserNameFactory,
  mockUserEmailFactory,
  mockUserPasswordFactory,
  mockUserRoleFactory,
  mockUserBannedFactory,
} from './user.mock';

export function mockUserUpdateBodyDtoFactory(
  override: Partial<UserUpdateBodyDto> = {},
): Required<UserUpdateBodyDto> {
  return {
    name: mockUserNameFactory(),
    email: mockUserEmailFactory(),
    password: mockUserPasswordFactory(),
    role: mockUserRoleFactory(),
    banned: mockUserBannedFactory(),
    ...override,
  };
}
