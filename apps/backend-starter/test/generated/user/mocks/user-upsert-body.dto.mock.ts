import { UserUpsertBodyDto } from '../../../../src/generated';
import {
  mockUserAgeFactory,
  mockUserBannedFactory,
  mockUserBlogUrlFactory,
  mockUserEmailFactory,
  mockUserListFactory,
  mockUserNameFactory,
  mockUserPasswordFactory,
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
