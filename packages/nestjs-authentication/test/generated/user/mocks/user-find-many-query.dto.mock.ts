import { UserFindManyQueryDto } from '../../../../src/generated';
import {
  mockUserNameFactory,
  mockUserEmailFactory,
  mockUserRoleFactory,
  mockUserBannedFactory,
} from './user.mock';

export function mockUserFindManyQueryDtoFactory(
  override: Partial<UserFindManyQueryDto> = {},
): Required<UserFindManyQueryDto> {
  return {
    name: mockUserNameFactory(),
    email: mockUserEmailFactory(),
    role: mockUserRoleFactory(),
    banned: mockUserBannedFactory(),
    sort: 'id',
    order: 'asc',
    take: 20,
    skip: 0,
    ...override,
  };
}
