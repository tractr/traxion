import { RelationlessService } from '@generated/relationless/common';

export function mockRelationlessServiceFactory(): RelationlessService {
  return ({
    create: jest.fn(),
    findUnique: jest.fn(),
    findMany: jest.fn(),
    count: jest.fn(),
    update: jest.fn(),
    upsert: jest.fn(),
    delete: jest.fn(),
  } as unknown) as RelationlessService;
}
