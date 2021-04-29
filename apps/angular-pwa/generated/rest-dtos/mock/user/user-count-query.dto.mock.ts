import { UserCountQueryDto } from '../../dtos';

import {
  mockUserIdFactory,
  mockUserNameFactory,
  mockUserEmailFactory,
  mockUserRoleFactory,
  mockUserBannedFactory,
  mockUserLastConnectedAtFactory,
  mockUserGenderFactory,
} from '@generated/models';

export function mockUserCountQueryDtoFactory(
  override: Partial<UserCountQueryDto> = {}
): Required< UserCountQueryDto> {
  return {
    id: mockUserIdFactory(),
    name: mockUserNameFactory(),
    email: mockUserEmailFactory(),
    role: mockUserRoleFactory(),
    banned: mockUserBannedFactory(),
    lastConnectedAt: mockUserLastConnectedAtFactory(),
    gender: mockUserGenderFactory(),
    ...override,
  };
}
