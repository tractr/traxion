import { UserCountQueryDto } from '../../../../src/generated';
import {
  mockUserAgeFactory,
  mockUserBannedFactory,
  mockUserBlogUrlFactory,
  mockUserEmailFactory,
  mockUserIdFactory,
  mockUserListFactory,
  mockUserNameFactory,
  mockUserRoleIdFactory,
} from './user.mock';

export function mockUserCountQueryDtoFactory(
  override: Partial<UserCountQueryDto> = {},
): Required<UserCountQueryDto> {
  return {
    id: mockUserIdFactory(),
    name: mockUserNameFactory(),
    email: mockUserEmailFactory(),
    banned: mockUserBannedFactory(),
    age: mockUserAgeFactory(),
    blogUrl: mockUserBlogUrlFactory(),
    list: mockUserListFactory(),
    role: mockUserRoleIdFactory(),
    ...override,
  };
}
