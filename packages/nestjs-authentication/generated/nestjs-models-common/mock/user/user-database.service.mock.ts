import { mockDeep } from 'jest-mock-extended';

import { UserDatabaseService } from '../../src';

export function mockUserDatabaseServiceFactory() {
  return mockDeep<UserDatabaseService>();
}
