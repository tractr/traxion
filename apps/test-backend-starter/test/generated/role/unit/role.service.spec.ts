import { Test, TestingModule } from '@nestjs/testing';
import { Prisma } from '@prisma/client';
import {
  RoleService,
  RoleDatabaseService,
  ROLE_DATABASE_SERVICE,
  ROLE_SERVICE,
} from '../../../../src/generated/role';
import { mockPrismaDelegateFactory } from '../../mocks';
import { mockRoleFactory } from '../mocks';

describe('RoleService', () => {
  let roleService: RoleService;
  let mockedRoleDatabaseService: RoleDatabaseService;

  beforeEach(async () => {
    mockedRoleDatabaseService = (mockPrismaDelegateFactory() as unknown) as RoleDatabaseService;
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: ROLE_DATABASE_SERVICE, useValue: mockedRoleDatabaseService },
        { provide: ROLE_SERVICE, useClass: RoleService },
      ],
    }).compile();
    roleService = module.get<RoleService>(ROLE_SERVICE);
  });

  it('should be defined', () => {
    expect(roleService).toBeDefined();
  });

  describe('create', () => {
    it('should map to RoleDatabaseService.create', async () => {
      const args = ({} as unknown) as Prisma.RoleCreateArgs;
      const role = mockRoleFactory();
      (mockedRoleDatabaseService.create as jest.Mock).mockReturnValueOnce(role);
      const result = await roleService.create(args);
      expect(result).toEqual(role);
      expect(mockedRoleDatabaseService.create).toHaveBeenCalledTimes(1);
      expect(mockedRoleDatabaseService.create).toHaveBeenCalledWith(args);
    });
  });

  describe('findUnique', () => {
    it('should map to RoleDatabaseService.findUnique', async () => {
      const args = ({} as unknown) as Prisma.RoleFindUniqueArgs;
      const role = mockRoleFactory();
      (mockedRoleDatabaseService.findUnique as jest.Mock).mockReturnValueOnce(
        role
      );
      const result = await roleService.findUnique(args);
      expect(result).toEqual(role);
      expect(mockedRoleDatabaseService.findUnique).toHaveBeenCalledTimes(1);
      expect(mockedRoleDatabaseService.findUnique).toHaveBeenCalledWith(args);
    });
  });

  describe('findMany', () => {
    it('should map to RoleDatabaseService.findMany', async () => {
      const args = ({} as unknown) as Prisma.RoleFindManyArgs;
      const role = new Array(3).map(() => mockRoleFactory());
      (mockedRoleDatabaseService.findMany as jest.Mock).mockReturnValueOnce(
        role
      );
      const result = await roleService.findMany(args);
      expect(result).toEqual(role);
      expect(mockedRoleDatabaseService.findMany).toHaveBeenCalledTimes(1);
      expect(mockedRoleDatabaseService.findMany).toHaveBeenCalledWith(args);
    });
  });

  describe('count', () => {
    it('should map to RoleDatabaseService.count', async () => {
      const args = ({} as unknown) as Prisma.RoleCountArgs;
      const role = 10;
      (mockedRoleDatabaseService.count as jest.Mock).mockReturnValueOnce(role);
      const result = await roleService.count(args);
      expect(result).toEqual(role);
      expect(mockedRoleDatabaseService.count).toHaveBeenCalledTimes(1);
      expect(mockedRoleDatabaseService.count).toHaveBeenCalledWith(args);
    });
  });

  describe('update', () => {
    it('should map to RoleDatabaseService.update', async () => {
      const args = ({} as unknown) as Prisma.RoleUpdateArgs;
      const role = mockRoleFactory();
      (mockedRoleDatabaseService.update as jest.Mock).mockReturnValueOnce(role);
      const result = await roleService.update(args);
      expect(result).toEqual(role);
      expect(mockedRoleDatabaseService.update).toHaveBeenCalledTimes(1);
      expect(mockedRoleDatabaseService.update).toHaveBeenCalledWith(args);
    });
  });

  describe('upsert', () => {
    it('should map to RoleDatabaseService.upsert', async () => {
      const args = ({} as unknown) as Prisma.RoleUpsertArgs;
      const role = mockRoleFactory();
      (mockedRoleDatabaseService.upsert as jest.Mock).mockReturnValueOnce(role);
      const result = await roleService.upsert(args);
      expect(result).toEqual(role);
      expect(mockedRoleDatabaseService.upsert).toHaveBeenCalledTimes(1);
      expect(mockedRoleDatabaseService.upsert).toHaveBeenCalledWith(args);
    });
  });

  describe('delete', () => {
    it('should map to RoleDatabaseService.delete', async () => {
      const args = ({} as unknown) as Prisma.RoleDeleteArgs;
      const role = mockRoleFactory();
      (mockedRoleDatabaseService.delete as jest.Mock).mockReturnValueOnce(role);
      const result = await roleService.delete(args);
      expect(result).toEqual(role);
      expect(mockedRoleDatabaseService.delete).toHaveBeenCalledTimes(1);
      expect(mockedRoleDatabaseService.delete).toHaveBeenCalledWith(args);
    });
  });
});
