import { UserUpsertBodyDto } from '../../dtos';

import {
  mockUserNameFactory,
  mockUserEmailFactory,
  mockUserPasswordFactory,
  mockUserRoleFactory,
  mockUserBannedFactory,
  mockUserGenderFactory,
} from '@generated/models';

export function mockUserUpsertBodyDtoFactory(
  override: Partial<UserUpsertBodyDto> = {}
): Required< UserUpsertBodyDto> {
  return {
    name: mockUserNameFactory(),
    email: mockUserEmailFactory(),
    password: mockUserPasswordFactory(),
    role: mockUserRoleFactory(),
    banned: mockUserBannedFactory(),
    gender: mockUserGenderFactory(),
    ...override,
  };
}
