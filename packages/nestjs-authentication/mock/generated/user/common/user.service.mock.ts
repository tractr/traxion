import { UserService } from '@generated/user/common';

export function mockUserServiceFactory(): UserService {
  return ({
    create: jest.fn(),
    findUnique: jest.fn(),
    findMany: jest.fn(),
    count: jest.fn(),
    update: jest.fn(),
    upsert: jest.fn(),
    delete: jest.fn(),
  } as unknown) as UserService;
}
