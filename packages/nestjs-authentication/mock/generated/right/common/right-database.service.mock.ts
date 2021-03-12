import { RightDatabaseService } from '@generated/right/common';

export function mockRightDatabaseServiceFactory(): RightDatabaseService {
  return ({
    findUnique: jest.fn(),
    findFirst: jest.fn(),
    findMany: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    updateMany: jest.fn(),
    upsert: jest.fn(),
    delete: jest.fn(),
    deleteMany: jest.fn(),
    count: jest.fn(),
    aggregate: jest.fn(),
  } as unknown) as RightDatabaseService;
}
