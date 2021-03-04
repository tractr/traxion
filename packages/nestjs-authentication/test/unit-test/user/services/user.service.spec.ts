import { Test, TestingModule } from '@nestjs/testing';
// import { Prisma, User } from '@prisma/client';
import { DatabaseService } from '@tractr/nestjs-database';

import { UserService } from '../../../../src/generated.example/user';
// import { userMockFactory } from '../../../mocks/user/user.mock';

describe('UserService', () => {
  let userService: UserService;
  // let databaseService: DatabaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, DatabaseService],
    }).compile();

    userService = module.get<UserService>(UserService);
    // databaseService = module.get<DatabaseService>(DatabaseService);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  describe('create', () => {
    it('should create a user', async () => {
      // No conflict between User and UserCreateInput ??
      // const user: User = userMockFactory();
      // const options = { include: { UserProfile: true } };

      // const spy = jest.spyOn(databaseService.user, 'create').mockImplementation(
      //   // eslint-disable-next-line camelcase
      //   () => (user as unknown) as Prisma.Prisma__UserClient<User>,
      // );

      throw new Error('should be updated');
      // const result = await userService.create(user, options);

      // expect(spy.mock.calls.length).toEqual(1);
      // expect(spy.mock.calls[0][0]).toEqual({ data: user, ...options });
      // expect(result).toEqual(user);
    });
  });

  describe('readOne', () => {
    it('should read a user', async () => {
      // const user: User = userMockFactory();
      // const where = { id: 1 };
      // const options = { include: { UserProfile: true } };

      // const spy = jest
      //   .spyOn(databaseService.user, 'findUnique')
      //   .mockImplementation(
      //     // eslint-disable-next-line camelcase
      //     () => (user as unknown) as Prisma.Prisma__UserClient<User>,
      //   );

      throw new Error('should be updated');
      // const result = await userService.readOne(where, options);

      // expect(spy.mock.calls.length).toEqual(1);
      // expect(spy.mock.calls[0][0]).toEqual({ where, ...options });
      // expect(result).toEqual(user);
    });
  });

  describe('readMany', () => {
    it('should read many users', async () => {
      // const users: User[] = [
      //   userMockFactory({ id: '1' }),
      //   userMockFactory({ id: '2' }),
      // ];
      // const where = { id: 1 };
      // const options = { include: { UserProfile: true } };

      // const spy = jest
      //   .spyOn(databaseService.user, 'findMany')
      //   .mockImplementation(
      //     // eslint-disable-next-line camelcase
      //     () => (users as unknown) as Promise<User[]>,
      //   );

      throw new Error('should be updated');
      // const result = await userService.readMany(where, options);

      // expect(spy.mock.calls.length).toEqual(1);
      // expect(spy.mock.calls[0][0]).toEqual({ where, ...options });
      // expect(result).toEqual(users);
    });
  });

  describe('count', () => {
    it('should count users', async () => {
      // const userCount = 2;
      // const where = { id: 1 };
      // const options = {};

      // const spy = jest
      //   .spyOn(databaseService.user, 'count')
      //   .mockImplementation(async () => userCount);

      throw new Error('should be updated');
      // const result = await userService.count(where, options);

      // expect(spy.mock.calls.length).toEqual(1);
      // expect(spy.mock.calls[0][0]).toEqual({ where, ...options });
      // expect(result).toEqual(userCount);
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      // const user = userMockFactory();
      // const where = { id: 1 };
      // const options = { include: { UserProfile: true } };

      // const spy = jest.spyOn(databaseService.user, 'update').mockImplementation(
      //   // eslint-disable-next-line camelcase
      //   () => (user as unknown) as Prisma.Prisma__UserClient<User>,
      // );

      throw new Error('should be updated');
      // const result = await userService.update(where, user, options);

      // expect(spy.mock.calls.length).toEqual(1);
      // expect(spy.mock.calls[0][0]).toEqual({ where, data: user, ...options });
      // expect(result).toEqual(user);
    });
  });

  describe('delete', () => {
    it('should delete a user', async () => {
      throw new Error('should be updated');
      // const user = userMockFactory();
      // const where = { where: { id: '1' } };
      // const options = { include: { UserProfile: true } };

      // const spy = jest.spyOn(databaseService.user, 'delete').mockImplementation(
      //   // eslint-disable-next-line camelcase
      //   () => (user as unknown) as Prisma.Prisma__UserClient<User>,
      // );

      // const result = await userService.delete(where);

      // expect(spy.mock.calls.length).toEqual(1);
      // expect(spy.mock.calls[0][0]).toEqual({ where, ...options });
      // expect(result).toEqual(user);
    });
  });
});
