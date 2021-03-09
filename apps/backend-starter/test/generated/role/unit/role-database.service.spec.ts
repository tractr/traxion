/* eslint-disable @typescript-eslint/unbound-method */
import { Test, TestingModule } from '@nestjs/testing';
import { Prisma } from '@prisma/client';
import { DatabaseService } from '@tractr/nestjs-database';

import {
  ROLE_DATABASE_SERVICE,
  RoleDatabaseService,
} from '../../../../src/generated/role';
import { mockDatabaseServiceFactory } from '../../mocks';
import { mockRoleFactory } from '../mocks';

describe('RoleDatabaseService', () => {
  let roleDatabaseService: RoleDatabaseService;
  let mockedDatabaseService: DatabaseService;

  beforeEach(async () => {
    mockedDatabaseService = mockDatabaseServiceFactory();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: ROLE_DATABASE_SERVICE, useClass: RoleDatabaseService },
        { provide: DatabaseService, useValue: mockedDatabaseService },
      ],
    }).compile();

    roleDatabaseService = module.get<RoleDatabaseService>(
      ROLE_DATABASE_SERVICE,
    );
  });

  it('should be defined', () => {
    expect(roleDatabaseService).toBeDefined();
  });

  describe('findUnique', () => {
    it('should map to DatabaseService.findUnique', async () => {
      const args = ('args' as unknown) as Prisma.RoleFindUniqueArgs;
      const role = mockRoleFactory();
      (mockedDatabaseService.role.findUnique as jest.Mock).mockReturnValueOnce(
        role,
      );
      const result = await roleDatabaseService.findUnique(args);
      expect(result).toEqual(role);
      expect(mockedDatabaseService.role.findUnique).toHaveBeenCalledTimes(1);
      expect(mockedDatabaseService.role.findUnique).toHaveBeenCalledWith(args);
    });
  });

  describe('findFirst', () => {
    it('should map to DatabaseService.findFirst', async () => {
      const args = ('args' as unknown) as Prisma.RoleFindFirstArgs;
      const role = mockRoleFactory();
      (mockedDatabaseService.role.findFirst as jest.Mock).mockReturnValueOnce(
        role,
      );
      const result = await roleDatabaseService.findFirst(args);
      expect(result).toEqual(role);
      expect(mockedDatabaseService.role.findFirst).toHaveBeenCalledTimes(1);
      expect(mockedDatabaseService.role.findFirst).toHaveBeenCalledWith(args);
    });
  });

  describe('findMany', () => {
    it('should map to DatabaseService.findMany', async () => {
      const args = ('args' as unknown) as Prisma.RoleFindManyArgs;
      const role = [...Array(3)].map(() => mockRoleFactory());
      (mockedDatabaseService.role.findMany as jest.Mock).mockReturnValueOnce(
        role,
      );
      const result = await roleDatabaseService.findMany(args);
      expect(result).toEqual(role);
      expect(mockedDatabaseService.role.findMany).toHaveBeenCalledTimes(1);
      expect(mockedDatabaseService.role.findMany).toHaveBeenCalledWith(args);
    });
  });

  describe('create', () => {
    it('should map to DatabaseService.create', async () => {
      const args = ('args' as unknown) as Prisma.RoleCreateArgs;
      const role = mockRoleFactory();
      (mockedDatabaseService.role.create as jest.Mock).mockReturnValueOnce(
        role,
      );
      const result = await roleDatabaseService.create(args);
      expect(result).toEqual(role);
      expect(mockedDatabaseService.role.create).toHaveBeenCalledTimes(1);
      expect(mockedDatabaseService.role.create).toHaveBeenCalledWith(args);
    });
  });

  describe('update', () => {
    it('should map to DatabaseService.update', async () => {
      const args = ('args' as unknown) as Prisma.RoleUpdateArgs;
      const role = mockRoleFactory();
      (mockedDatabaseService.role.update as jest.Mock).mockReturnValueOnce(
        role,
      );
      const result = await roleDatabaseService.update(args);
      expect(result).toEqual(role);
      expect(mockedDatabaseService.role.update).toHaveBeenCalledTimes(1);
      expect(mockedDatabaseService.role.update).toHaveBeenCalledWith(args);
    });
  });

  describe('updateMany', () => {
    it('should map to DatabaseService.updateMany', async () => {
      const args = ('args' as unknown) as Prisma.RoleUpdateManyArgs;
      const role = mockRoleFactory();
      (mockedDatabaseService.role.updateMany as jest.Mock).mockReturnValueOnce(
        role,
      );
      const result = await roleDatabaseService.updateMany(args);
      expect(result).toEqual(role);
      expect(mockedDatabaseService.role.updateMany).toHaveBeenCalledTimes(1);
      expect(mockedDatabaseService.role.updateMany).toHaveBeenCalledWith(args);
    });
  });

  describe('upsert', () => {
    it('should map to DatabaseService.upsert', async () => {
      const args = ('args' as unknown) as Prisma.RoleUpsertArgs;
      const role = mockRoleFactory();
      (mockedDatabaseService.role.upsert as jest.Mock).mockReturnValueOnce(
        role,
      );
      const result = await roleDatabaseService.upsert(args);
      expect(result).toEqual(role);
      expect(mockedDatabaseService.role.upsert).toHaveBeenCalledTimes(1);
      expect(mockedDatabaseService.role.upsert).toHaveBeenCalledWith(args);
    });
  });

  describe('delete', () => {
    it('should map to DatabaseService.delete', async () => {
      const args = ('args' as unknown) as Prisma.RoleDeleteArgs;
      const role = mockRoleFactory();
      (mockedDatabaseService.role.delete as jest.Mock).mockReturnValueOnce(
        role,
      );
      const result = await roleDatabaseService.delete(args);
      expect(result).toEqual(role);
      expect(mockedDatabaseService.role.delete).toHaveBeenCalledTimes(1);
      expect(mockedDatabaseService.role.delete).toHaveBeenCalledWith(args);
    });
  });

  describe('deleteMany', () => {
    it('should map to DatabaseService.deleteMany', async () => {
      const args = ('args' as unknown) as Prisma.RoleDeleteManyArgs;
      const role = mockRoleFactory();
      (mockedDatabaseService.role.deleteMany as jest.Mock).mockReturnValueOnce(
        role,
      );
      const result = await roleDatabaseService.deleteMany(args);
      expect(result).toEqual(role);
      expect(mockedDatabaseService.role.deleteMany).toHaveBeenCalledTimes(1);
      expect(mockedDatabaseService.role.deleteMany).toHaveBeenCalledWith(args);
    });
  });

  describe('count', () => {
    it('should map to DatabaseService.count', async () => {
      const args = ('args' as unknown) as Prisma.RoleCountArgs;
      const role = mockRoleFactory();
      (mockedDatabaseService.role.count as jest.Mock).mockReturnValueOnce(role);
      const result = await roleDatabaseService.count(args);
      expect(result).toEqual(role);
      expect(mockedDatabaseService.role.count).toHaveBeenCalledTimes(1);
      expect(mockedDatabaseService.role.count).toHaveBeenCalledWith(args);
    });
  });

  describe('aggregate', () => {
    it('should map to DatabaseService.aggregate', async () => {
      const args = ('args' as unknown) as Prisma.RoleAggregateArgs;
      const role = mockRoleFactory();
      (mockedDatabaseService.role.aggregate as jest.Mock).mockReturnValueOnce(
        role,
      );
      const result = await roleDatabaseService.aggregate(args);
      expect(result).toEqual(role);
      expect(mockedDatabaseService.role.aggregate).toHaveBeenCalledTimes(1);
      expect(mockedDatabaseService.role.aggregate).toHaveBeenCalledWith(args);
    });
  });
});
