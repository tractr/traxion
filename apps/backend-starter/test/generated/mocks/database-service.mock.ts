import { DatabaseService } from '@tractr/nestjs-database';

export function mockPrismaDelegateFactory() {
  return {
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
  };
}

export function mockDatabaseServiceFactory(): DatabaseService {
  return ({
    profile: mockPrismaDelegateFactory(),
    relationless: mockPrismaDelegateFactory(),
    right: mockPrismaDelegateFactory(),
    role: mockPrismaDelegateFactory(),
    user: mockPrismaDelegateFactory(),
  } as unknown) as DatabaseService;
}
