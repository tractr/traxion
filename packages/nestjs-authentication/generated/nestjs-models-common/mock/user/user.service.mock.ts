import { mockDeep } from 'jest-mock-extended';

import { UserService } from '../../src';

export function mockUserServiceFactory() {
  return mockDeep<UserService>();
}
