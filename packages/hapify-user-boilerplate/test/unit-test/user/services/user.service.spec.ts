import { Test, TestingModule } from '@nestjs/testing';
import { User } from '@prisma/client';
import { DatabaseService } from '../../../../src/core';
import {
  CreateUserDto,
  ReadUserDto,
  SearchUserDto,
  UpdateUserDto,
  UserService,
} from '../../../../src/user';

describe('UserService', () => {
  let userService: UserService;
  let databaseService: DatabaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, DatabaseService],
    }).compile();

    userService = module.get<UserService>(UserService);
    databaseService = module.get<DatabaseService>(DatabaseService);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  describe('create', () => {
    it('should create a user', async () => {
      const data: CreateUserDto = {
        name: 'name',
        email: 'email@email.com',
        password: 'password',
        role: 'admin',
        banned: false,
      };
      const expectedResult: User = {
        id: 1,
        ...data,
        lastConnectedAt: new Date(),
      };

      const spy = jest
        .spyOn(databaseService.user, 'create')
        .mockImplementation(() => expectedResult as any);

      const result = await userService.create(data);

      expect(spy.mock.calls.length).toEqual(1);
      expect(spy.mock.calls[0][0]).toEqual({ data });
      expect(result).toEqual(expectedResult);
    });
  });

  describe('read', () => {
    it('should read a user', async () => {
      const expectedResult: User = {
        id: 1,
        name: 'name',
        email: 'email@email.com',
        password: 'password',
        role: 'admin',
        banned: false,
        lastConnectedAt: new Date(),
      };
      const id = 1;
      const include: ReadUserDto = { UserProfile: true };

      const spy = jest
        .spyOn(databaseService.user, 'findUnique')
        .mockImplementation(() => expectedResult as any);

      const result = await userService.read(id, include);

      expect(spy.mock.calls.length).toEqual(1);
      expect(spy.mock.calls[0][0]).toEqual({ where: { id }, include });
      expect(result).toEqual(expectedResult);
    });
  });

  describe('search', () => {
    it('should search users', async () => {
      const filters: SearchUserDto = {
        id: 1,
        name: 'name',
        email: 'email@email.com',
        role: 'admin',
        banned: false,
      };
      const expectedResult: User[] = [
        {
          id: 1,
          name: 'name',
          email: 'email@email.com',
          password: 'password',
          role: 'admin',
          banned: false,
          lastConnectedAt: new Date(),
        },
      ];

      const spy = jest
        .spyOn(databaseService.user, 'findMany')
        .mockImplementation(() => expectedResult as any);

      const result = await userService.search(filters);

      expect(spy.mock.calls.length).toEqual(1);
      expect(spy.mock.calls[0][0]).toEqual({
        where: {
          id: {
            equals: filters.id,
          },
          name: {
            contains: filters.name,
          },
          email: {
            contains: filters.email,
          },
          role: {
            contains: filters.role,
          },
          banned: {
            equals: filters.banned,
          },
        },
      });
      expect(result).toEqual(expectedResult);
    });
  });

  describe('count', () => {
    it('should count users', async () => {
      const filters: SearchUserDto = {
        id: 1,
        name: 'name',
        email: 'email@email.com',
        role: 'admin',
        banned: false,
      };
      const expectedResult = 1;

      const spy = jest
        .spyOn(databaseService.user, 'count')
        .mockImplementation(() => expectedResult as any);

      const result = await userService.count(filters);

      expect(spy.mock.calls.length).toEqual(1);
      expect(spy.mock.calls[0][0]).toEqual({
        where: {
          id: {
            equals: filters.id,
          },
          name: {
            contains: filters.name,
          },
          email: {
            contains: filters.email,
          },
          role: {
            contains: filters.role,
          },
          banned: {
            equals: filters.banned,
          },
        },
      });
      expect(result).toEqual(expectedResult);
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const id = 1;
      const data: UpdateUserDto = {
        name: 'name',
        email: 'email@email.com',
        password: 'password',
        role: 'admin',
        banned: false,
      };
      const expectedResult: User = {
        id: 1,
        ...data,
        lastConnectedAt: new Date(),
      } as User;

      const spy = jest
        .spyOn(databaseService.user, 'update')
        .mockImplementation(() => expectedResult as any);

      const result = await userService.update(id, data);

      expect(spy.mock.calls.length).toEqual(1);
      expect(spy.mock.calls[0][0]).toEqual({
        where: {
          id,
        },
        data,
      });
      expect(result).toEqual(expectedResult);
    });
  });

  describe('delete', () => {
    it('should delete a user', async () => {
      const id = 1;
      const expectedResult: User = {
        id: 1,
        name: 'name',
        email: 'email@email.com',
        password: 'password',
        role: 'admin',
        banned: false,
        lastConnectedAt: new Date(),
      };

      const spy = jest
        .spyOn(databaseService.user, 'delete')
        .mockImplementation(() => expectedResult as any);

      const result = await userService.delete(id);

      expect(spy.mock.calls.length).toEqual(1);
      expect(spy.mock.calls[0][0]).toEqual({ where: { id } });
      expect(result).toEqual(expectedResult);
    });
  });
});
