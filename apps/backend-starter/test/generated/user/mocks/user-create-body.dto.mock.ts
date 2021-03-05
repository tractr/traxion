import { UserCreateBodyDto } from '../../../../src/generated';
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

export function mockUserCreateBodyDtoFactory(
  override: Partial<UserCreateBodyDto> = {},
): Required<UserCreateBodyDto> {
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
