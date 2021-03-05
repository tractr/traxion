import { UserUpsertBodyDto } from '../../../../src/generated';
import {
  mockUserNameFactory,
  mockUserEmailFactory,
  mockUserPasswordFactory,
  mockUserBannedFactory,
  mockUserAgeFactory,
  mockUserBlogUrlFactory,
  mockUserListFactory,
  mockUserRoleIdFactory,
} from './user.mock';

export function mockUserUpsertBodyDtoFactory(
  override: Partial<UserUpsertBodyDto> = {},
): Required<UserUpsertBodyDto> {
  return {
    name: mockUserNameFactory(),
    email: mockUserEmailFactory(),
    password: mockUserPasswordFactory(),
    banned: mockUserBannedFactory(),
    age: mockUserAgeFactory(),
    blogUrl: mockUserBlogUrlFactory(),
    list: mockUserListFactory(),
    role: mockUserRoleIdFactory(),
    ...override,
  };
}
