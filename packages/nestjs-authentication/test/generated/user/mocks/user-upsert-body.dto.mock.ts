import { UserUpsertBodyDto } from '../../../../src/generated';
import {
  mockUserNameFactory,
  mockUserEmailFactory,
  mockUserPasswordFactory,
  mockUserRoleFactory,
  mockUserBannedFactory,
} from './user.mock';

export function mockUserUpsertBodyDtoFactory(
  override: Partial<UserUpsertBodyDto> = {},
): Required<UserUpsertBodyDto> {
  return {
    name: mockUserNameFactory(),
    email: mockUserEmailFactory(),
    password: mockUserPasswordFactory(),
    role: mockUserRoleFactory(),
    banned: mockUserBannedFactory(),
    ...override,
  };
}
