import { UserCountQueryDto } from '../../../../src/generated';
import {
  mockUserNameFactory,
  mockUserEmailFactory,
  mockUserRoleFactory,
  mockUserBannedFactory,
} from './user.mock';

export function mockUserCountQueryDtoFactory(
  override: Partial<UserCountQueryDto> = {},
): Required<UserCountQueryDto> {
  return {
    name: mockUserNameFactory(),
    email: mockUserEmailFactory(),
    role: mockUserRoleFactory(),
    banned: mockUserBannedFactory(),
    ...override,
  };
}
