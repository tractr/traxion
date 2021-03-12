import { RoleService } from '@generated/role/common';

export function mockRoleServiceFactory(): RoleService {
  return ({
    create: jest.fn(),
    findUnique: jest.fn(),
    findMany: jest.fn(),
    count: jest.fn(),
    update: jest.fn(),
    upsert: jest.fn(),
    delete: jest.fn(),
  } as unknown) as RoleService;
}
