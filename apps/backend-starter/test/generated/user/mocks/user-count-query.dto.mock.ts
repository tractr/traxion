import { UserCountQueryDto } from '../../../../src/generated';
import {
  mockUserIdFactory,
  mockUserNameFactory,
  mockUserEmailFactory,
  mockUserBannedFactory,
  mockUserAgeFactory,
  mockUserBlogUrlFactory,
  mockUserListFactory,
  mockUserRoleIdFactory,
} from './user.mock';

export function mockUserCountQueryDtoFactory(
  override: Partial<UserCountQueryDto> = {},
): UserCountQueryDto {
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
