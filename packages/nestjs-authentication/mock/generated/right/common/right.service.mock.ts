import { RightService } from '@generated/right/common';

export function mockRightServiceFactory(): RightService {
  return ({
    create: jest.fn(),
    findUnique: jest.fn(),
    findMany: jest.fn(),
    count: jest.fn(),
    update: jest.fn(),
    upsert: jest.fn(),
    delete: jest.fn(),
  } as unknown) as RightService;
}
