import { UserUpdateBodyDto } from '../../dtos';

import {
  mockUserNameFactory,
  mockUserEmailFactory,
  mockUserPasswordFactory,
  mockUserRoleFactory,
  mockUserBannedFactory,
  mockUserLastConnectedAtFactory,
  mockUserGenderFactory,
} from '@generated/models';

export function mockUserUpdateBodyDtoFactory(
  override: Partial<UserUpdateBodyDto> = {}
): Required< UserUpdateBodyDto> {
  return {
    name: mockUserNameFactory(),
    email: mockUserEmailFactory(),
    password: mockUserPasswordFactory(),
    role: mockUserRoleFactory(),
    banned: mockUserBannedFactory(),
    lastConnectedAt: mockUserLastConnectedAtFactory(),
    gender: mockUserGenderFactory(),
    ...override,
  };
}
