import { Test, TestingModule } from '@nestjs/testing';
import { Prisma } from '@prisma/client';
import {
  UserService,
  UserDatabaseService,
  USER_DATABASE_SERVICE,
  USER_SERVICE,
} from '../../../../src/generated/user';
import { mockPrismaDelegateFactory } from '../../mocks';
import { mockUserFactory } from '../mocks';

describe('UserService', () => {
  let userService: UserService;
  let mockedUserDatabaseService: UserDatabaseService;

  beforeEach(async () => {
    mockedUserDatabaseService = (mockPrismaDelegateFactory() as unknown) as UserDatabaseService;
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: USER_DATABASE_SERVICE, useValue: mockedUserDatabaseService },
        { provide: USER_SERVICE, useClass: UserService },
      ],
    }).compile();
    userService = module.get<UserService>(USER_SERVICE);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  describe('create', () => {
    it('should map to UserDatabaseService.create', async () => {
      const args = ('args' as unknown) as Prisma.UserCreateArgs;
      const user = mockUserFactory();
      (mockedUserDatabaseService.create as jest.Mock).mockReturnValueOnce(user);
      const result = await userService.create(args);
      expect(result).toEqual(user);
      expect(mockedUserDatabaseService.create).toHaveBeenCalledTimes(1);
      expect(mockedUserDatabaseService.create).toHaveBeenCalledWith(args);
    });
  });

  describe('findUnique', () => {
    it('should map to UserDatabaseService.findUnique', async () => {
      const args = ('args' as unknown) as Prisma.UserFindUniqueArgs;
      const user = mockUserFactory();
      (mockedUserDatabaseService.findUnique as jest.Mock).mockReturnValueOnce(
        user,
      );
      const result = await userService.findUnique(args);
      expect(result).toEqual(user);
      expect(mockedUserDatabaseService.findUnique).toHaveBeenCalledTimes(1);
      expect(mockedUserDatabaseService.findUnique).toHaveBeenCalledWith(args);
    });
  });

  describe('findMany', () => {
    it('should map to UserDatabaseService.findMany', async () => {
      const args = ('args' as unknown) as Prisma.UserFindManyArgs;
      const user = new Array(3).map(() => mockUserFactory());
      (mockedUserDatabaseService.findMany as jest.Mock).mockReturnValueOnce(
        user,
      );
      const result = await userService.findMany(args);
      expect(result).toEqual(user);
      expect(mockedUserDatabaseService.findMany).toHaveBeenCalledTimes(1);
      expect(mockedUserDatabaseService.findMany).toHaveBeenCalledWith(args);
    });
  });

  describe('count', () => {
    it('should map to UserDatabaseService.count', async () => {
      const args = ('args' as unknown) as Prisma.UserCountArgs;
      const user = 10;
      (mockedUserDatabaseService.count as jest.Mock).mockReturnValueOnce(user);
      const result = await userService.count(args);
      expect(result).toEqual(user);
      expect(mockedUserDatabaseService.count).toHaveBeenCalledTimes(1);
      expect(mockedUserDatabaseService.count).toHaveBeenCalledWith(args);
    });
  });

  describe('update', () => {
    it('should map to UserDatabaseService.update', async () => {
      const args = ('args' as unknown) as Prisma.UserUpdateArgs;
      const user = mockUserFactory();
      (mockedUserDatabaseService.update as jest.Mock).mockReturnValueOnce(user);
      const result = await userService.update(args);
      expect(result).toEqual(user);
      expect(mockedUserDatabaseService.update).toHaveBeenCalledTimes(1);
      expect(mockedUserDatabaseService.update).toHaveBeenCalledWith(args);
    });
  });

  describe('upsert', () => {
    it('should map to UserDatabaseService.upsert', async () => {
      const args = ('args' as unknown) as Prisma.UserUpsertArgs;
      const user = mockUserFactory();
      (mockedUserDatabaseService.upsert as jest.Mock).mockReturnValueOnce(user);
      const result = await userService.upsert(args);
      expect(result).toEqual(user);
      expect(mockedUserDatabaseService.upsert).toHaveBeenCalledTimes(1);
      expect(mockedUserDatabaseService.upsert).toHaveBeenCalledWith(args);
    });
  });

  describe('delete', () => {
    it('should map to UserDatabaseService.delete', async () => {
      const args = ('args' as unknown) as Prisma.UserDeleteArgs;
      const user = mockUserFactory();
      (mockedUserDatabaseService.delete as jest.Mock).mockReturnValueOnce(user);
      const result = await userService.delete(args);
      expect(result).toEqual(user);
      expect(mockedUserDatabaseService.delete).toHaveBeenCalledTimes(1);
      expect(mockedUserDatabaseService.delete).toHaveBeenCalledWith(args);
    });
  });
});
