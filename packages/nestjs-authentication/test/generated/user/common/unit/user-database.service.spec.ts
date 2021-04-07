/* eslint-disable @typescript-eslint/unbound-method */
import { 
  mockUserDatabaseServiceFactory,
  mockUserFactory,
} from '@generated-mock/user/common';
import {
  USER_DATABASE_SERVICE,
  UserDatabaseService,
} from '@generated/user/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Prisma } from '@prisma/client';
import { DatabaseService } from '@tractr/nestjs-database';

describe('UserDatabaseService', () => {
  let userDatabaseService: UserDatabaseService;
  let mockedDatabaseService: DatabaseService;

  beforeEach(async () => {
    mockedDatabaseService = ({ user: mockUserDatabaseServiceFactory() } as unknown) as DatabaseService;;
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: USER_DATABASE_SERVICE, useClass: UserDatabaseService },
        { provide: DatabaseService, useValue: mockedDatabaseService },
      ],
    }).compile();

    userDatabaseService = module.get< UserDatabaseService>(
      USER_DATABASE_SERVICE
    );
  });

  it('should be defined', () => {
    expect(userDatabaseService).toBeDefined();
  });

  describe('findUnique', () => {
    it('should map to DatabaseService.findUnique', async () => {
      const args = ('args' as unknown) as Prisma.UserFindUniqueArgs;
      const user = mockUserFactory();
      (mockedDatabaseService.user.findUnique as jest.Mock).mockReturnValueOnce(
        user
      );
      const result = await userDatabaseService.findUnique(args);
      expect(result).toEqual(user);
      expect(mockedDatabaseService.user.findUnique).toHaveBeenCalledTimes(1);
      expect(mockedDatabaseService.user.findUnique).toHaveBeenCalledWith(args);
    });
  });

  describe('findFirst', () => {
    it('should map to DatabaseService.findFirst', async () => {
      const args = ('args' as unknown) as Prisma.UserFindFirstArgs;
      const user = mockUserFactory();
      (mockedDatabaseService.user.findFirst as jest.Mock).mockReturnValueOnce(
        user
      );
      const result = await userDatabaseService.findFirst(args);
      expect(result).toEqual(user);
      expect(mockedDatabaseService.user.findFirst).toHaveBeenCalledTimes(1);
      expect(mockedDatabaseService.user.findFirst).toHaveBeenCalledWith(args);
    });
  });

  describe('findMany', () => {
    it('should map to DatabaseService.findMany', async () => {
      const args = ('args' as unknown) as Prisma.UserFindManyArgs;
      const user = [...Array(3)].map(() => mockUserFactory());
      (mockedDatabaseService.user.findMany as jest.Mock).mockReturnValueOnce(
        user
      );
      const result = await userDatabaseService.findMany(args);
      expect(result).toEqual(user);
      expect(mockedDatabaseService.user.findMany).toHaveBeenCalledTimes(1);
      expect(mockedDatabaseService.user.findMany).toHaveBeenCalledWith(args);
    });
  });

  describe('create', () => {
    it('should map to DatabaseService.create', async () => {
      const args = ('args' as unknown) as Prisma.UserCreateArgs;
      const user = mockUserFactory();
      (mockedDatabaseService.user.create as jest.Mock).mockReturnValueOnce(
        user
      );
      const result = await userDatabaseService.create(args);
      expect(result).toEqual(user);
      expect(mockedDatabaseService.user.create).toHaveBeenCalledTimes(1);
      expect(mockedDatabaseService.user.create).toHaveBeenCalledWith(args);
    });
  });

  describe('update', () => {
    it('should map to DatabaseService.update', async () => {
      const args = ('args' as unknown) as Prisma.UserUpdateArgs;
      const user = mockUserFactory();
      (mockedDatabaseService.user.update as jest.Mock).mockReturnValueOnce(
        user
      );
      const result = await userDatabaseService.update(args);
      expect(result).toEqual(user);
      expect(mockedDatabaseService.user.update).toHaveBeenCalledTimes(1);
      expect(mockedDatabaseService.user.update).toHaveBeenCalledWith(args);
    });
  });

  describe('updateMany', () => {
    it('should map to DatabaseService.updateMany', async () => {
      const args = ('args' as unknown) as Prisma.UserUpdateManyArgs;
      const user = mockUserFactory();
      (mockedDatabaseService.user.updateMany as jest.Mock).mockReturnValueOnce(
        user
      );
      const result = await userDatabaseService.updateMany(args);
      expect(result).toEqual(user);
      expect(mockedDatabaseService.user.updateMany).toHaveBeenCalledTimes(1);
      expect(mockedDatabaseService.user.updateMany).toHaveBeenCalledWith(args);
    });
  });

  describe('upsert', () => {
    it('should map to DatabaseService.upsert', async () => {
      const args = ('args' as unknown) as Prisma.UserUpsertArgs;
      const user = mockUserFactory();
      (mockedDatabaseService.user.upsert as jest.Mock).mockReturnValueOnce(
        user
      );
      const result = await userDatabaseService.upsert(args);
      expect(result).toEqual(user);
      expect(mockedDatabaseService.user.upsert).toHaveBeenCalledTimes(1);
      expect(mockedDatabaseService.user.upsert).toHaveBeenCalledWith(args);
    });
  });

  describe('delete', () => {
    it('should map to DatabaseService.delete', async () => {
      const args = ('args' as unknown) as Prisma.UserDeleteArgs;
      const user = mockUserFactory();
      (mockedDatabaseService.user.delete as jest.Mock).mockReturnValueOnce(
        user
      );
      const result = await userDatabaseService.delete(args);
      expect(result).toEqual(user);
      expect(mockedDatabaseService.user.delete).toHaveBeenCalledTimes(1);
      expect(mockedDatabaseService.user.delete).toHaveBeenCalledWith(args);
    });
  });

  describe('deleteMany', () => {
    it('should map to DatabaseService.deleteMany', async () => {
      const args = ('args' as unknown) as Prisma.UserDeleteManyArgs;
      const user = mockUserFactory();
      (mockedDatabaseService.user.deleteMany as jest.Mock).mockReturnValueOnce(
        user
      );
      const result = await userDatabaseService.deleteMany(args);
      expect(result).toEqual(user);
      expect(mockedDatabaseService.user.deleteMany).toHaveBeenCalledTimes(1);
      expect(mockedDatabaseService.user.deleteMany).toHaveBeenCalledWith(args);
    });
  });

  describe('count', () => {
    it('should map to DatabaseService.count', async () => {
      const args = ('args' as unknown) as Prisma.UserCountArgs;
      const user = mockUserFactory();
      (mockedDatabaseService.user.count as jest.Mock).mockReturnValueOnce(
        user
      );
      const result = await userDatabaseService.count(args);
      expect(result).toEqual(user);
      expect(mockedDatabaseService.user.count).toHaveBeenCalledTimes(1);
      expect(mockedDatabaseService.user.count).toHaveBeenCalledWith(args);
    });
  });

  describe('aggregate', () => {
    it('should map to DatabaseService.aggregate', async () => {
      const args = ('args' as unknown) as Prisma.UserAggregateArgs;
      const user = mockUserFactory();
      (mockedDatabaseService.user.aggregate as jest.Mock).mockReturnValueOnce(
        user
      );
      const result = await userDatabaseService.aggregate(args);
      expect(result).toEqual(user);
      expect(mockedDatabaseService.user.aggregate).toHaveBeenCalledTimes(1);
      expect(mockedDatabaseService.user.aggregate).toHaveBeenCalledWith(args);
    });
  });
});
