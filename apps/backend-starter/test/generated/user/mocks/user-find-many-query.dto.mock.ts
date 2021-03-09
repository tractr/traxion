import { UserFindManyQueryDto } from '../../../../src/generated';
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

export function mockUserFindManyQueryDtoFactory(
  override: Partial<UserFindManyQueryDto> = {},
): Required<UserFindManyQueryDto> {
  return {
    id: mockUserIdFactory(),
    name: mockUserNameFactory(),
    email: mockUserEmailFactory(),
    banned: mockUserBannedFactory(),
    age: mockUserAgeFactory(),
    blogUrl: mockUserBlogUrlFactory(),
    list: mockUserListFactory(),
    role: mockUserRoleIdFactory(),
    populate: ['role', 'profileAsOwner'],
    sort: 'id',
    order: 'asc',
    take: 20,
    skip: 0,
    ...override,
  };
}
