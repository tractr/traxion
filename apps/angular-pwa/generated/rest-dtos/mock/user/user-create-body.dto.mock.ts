import { UserCreateBodyDto } from '../../dtos';

import {
  mockUserNameFactory,
  mockUserEmailFactory,
  mockUserPasswordFactory,
  mockUserRoleFactory,
  mockUserBannedFactory,
  mockUserLastConnectedAtFactory,
  mockUserGenderFactory,
} from '@generated/models';

export function mockUserCreateBodyDtoFactory(
  override: Partial<UserCreateBodyDto> = {}
): Required< UserCreateBodyDto> {
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
