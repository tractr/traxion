import { ProfileService } from '@generated/profile/common';

export function mockProfileServiceFactory(): ProfileService {
  return ({
    create: jest.fn(),
    findUnique: jest.fn(),
    findMany: jest.fn(),
    count: jest.fn(),
    update: jest.fn(),
    upsert: jest.fn(),
    delete: jest.fn(),
  } as unknown) as ProfileService;
}
