import { UserCreateBodyDto } from '../../../../src/generated';
import {
  mockUserNameFactory,
  mockUserEmailFactory,
  mockUserPasswordFactory,
  mockUserRoleFactory,
  mockUserBannedFactory,
} from './user.mock';

export function mockUserCreateBodyDtoFactory(
  override: Partial<UserCreateBodyDto> = {},
): Required<UserCreateBodyDto> {
  return {
    name: mockUserNameFactory(),
    email: mockUserEmailFactory(),
    password: mockUserPasswordFactory(),
    role: mockUserRoleFactory(),
    banned: mockUserBannedFactory(),
    ...override,
  };
}
