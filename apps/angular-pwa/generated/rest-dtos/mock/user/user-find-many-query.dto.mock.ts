import { UserFindManyQueryDto } from '../../dtos';

import {
  mockUserIdFactory,
  mockUserNameFactory,
  mockUserEmailFactory,
  mockUserRoleFactory,
  mockUserBannedFactory,
  mockUserLastConnectedAtFactory,
  mockUserGenderFactory,
} from '@generated/models';

export function mockUserFindManyQueryDtoFactory(
  override: Partial<UserFindManyQueryDto> = {}
): Required< UserFindManyQueryDto> {
  return {
    id: mockUserIdFactory(),
    name: mockUserNameFactory(),
    email: mockUserEmailFactory(),
    role: mockUserRoleFactory(),
    banned: mockUserBannedFactory(),
    lastConnectedAt: mockUserLastConnectedAtFactory(),
    gender: mockUserGenderFactory(),
    populate: [
          'answerAsUser',
    ],
    sort: 'id',
    order: 'asc',
    take: 20,
    skip: 0,
    ...override,
  };
}
