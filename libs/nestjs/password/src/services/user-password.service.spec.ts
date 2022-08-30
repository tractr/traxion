/* eslint-disable @typescript-eslint/unbound-method */

import { Test, TestingModule } from '@nestjs/testing';
import { Prisma, User } from '@prisma/client';
import { mockDeep, MockProxy, mockReset } from 'jest-mock-extended';

import { PasswordModuleOptions } from '../interfaces';
import { MODULE_OPTIONS_TOKEN } from '../password.module-definition';
import { UserPasswordService } from './user-password.service';

import { LoggerModule } from '@tractr/nestjs-core';

describe('UserPasswordService', () => {
  let userPasswordService: UserPasswordService;
  let mockPasswordModuleOptions: MockProxy<PasswordModuleOptions>;
  let mockUserService: MockProxy<Prisma.UserDelegate<false>>;

  beforeEach(async () => {
    mockUserService = mockDeep<Prisma.UserDelegate<false>>();
    mockPasswordModuleOptions = mockDeep<PasswordModuleOptions>({
      userService: mockUserService,
    });

    const module: TestingModule = await Test.createTestingModule({
      imports: [LoggerModule],
      providers: [
        UserPasswordService,
        {
          provide: MODULE_OPTIONS_TOKEN,
          useValue: mockPasswordModuleOptions,
        },
      ],
    }).compile();

    userPasswordService = module.get<UserPasswordService>(UserPasswordService);
  });

  afterEach(() => {
    mockReset(mockPasswordModuleOptions);
    mockReset(mockUserService);
  });

  it('should be defined', () => {
    expect(userPasswordService).toBeDefined();
  });

  it('should get the fields from the configuration', async () => {
    mockPasswordModuleOptions.user = undefined;

    let res = userPasswordService.getUserFromUserInfo({
      id: 'id',
      email: 'email',
      password: 'password',
    });

    expect(res).toEqual({
      id: 'id',
      email: 'email',
      password: 'password',
    });

    mockPasswordModuleOptions.user = {};

    res = userPasswordService.getUserFromUserInfo({
      id: 'id',
      email: 'email',
      password: 'password',
    });

    expect(res).toEqual({
      id: 'id',
      email: 'email',
      password: 'password',
    });
  });

  describe('getUserFromUserInfo', () => {
    it('should get the user from the user info', async () => {
      const { id, email, password } = {
        id: 'id',
        email: 'email',
        password: 'password',
      };

      mockPasswordModuleOptions.user = {
        fields: {
          id: 'idField',
          email: 'emailField',
          password: 'passwordField',
        },
      };

      const result = userPasswordService.getUserFromUserInfo({
        id,
        email,
        password,
      });
      expect(result).toEqual({
        idField: id,
        emailField: email,
        passwordField: password,
      });
    });
  });
  describe('getUserFromId', () => {
    it('should return a user with the default options', async () => {
      mockUserService.findUnique.mockResolvedValue({
        id: '1',
        email: 'email',
        password: 'password',
        otherField: 'otherField',
      } as unknown as User);

      const res = await userPasswordService.getUserFromId('1');

      expect(res).toEqual({
        id: '1',
        email: 'email',
        password: 'password',
      });

      expect(mockUserService.findUnique).toHaveBeenCalledWith({
        where: { id: '1' },
        select: { id: true, email: true, password: true },
      });
    });

    it('should return a user using the options set during the module configuration', async () => {
      mockPasswordModuleOptions.user = {
        fields: {
          id: 'idField',
          email: 'loginField',
          password: 'passwordField',
        },
      };

      mockUserService.findUnique.mockResolvedValue({
        idField: '1',
        loginField: 'email',
        passwordField: 'password',
        otherField: 'otherField',
      } as unknown as User);

      const res = await userPasswordService.getUserFromId('1');

      expect(res).toEqual({
        id: '1',
        email: 'email',
        password: 'password',
      });

      expect(mockUserService.findUnique).toHaveBeenCalledWith({
        where: { idField: '1' },
        select: { idField: true, loginField: true, passwordField: true },
      });
    });

    it('should return null if the user is not found from findUnique', async () => {
      mockUserService.findUnique.mockResolvedValue(null);
      const res = await userPasswordService.getUserFromId('1');

      expect(res).toBeNull();
    });

    it('should return null if findUnique does not return all the information needed', async () => {
      mockUserService.findUnique.mockResolvedValue({
        id: 'id ',
      } as unknown as User);
      const res = await userPasswordService.getUserFromId('1');

      expect(res).toBeNull();
    });
  });

  describe('getUserFromLogin', () => {
    it('should return a user with the default options', async () => {
      mockUserService.findUnique.mockResolvedValue({
        id: '1',
        email: 'email',
        password: 'password',
        otherField: 'otherField',
      } as unknown as User);

      const res = await userPasswordService.getUserFromLogin('email');

      expect(res).toEqual({
        id: '1',
        email: 'email',
        password: 'password',
      });

      expect(mockUserService.findUnique).toHaveBeenCalledWith({
        where: { email: 'email' },
        select: { id: true, email: true, password: true },
      });
    });

    it('should return a user using the options set during the module configuration', async () => {
      mockPasswordModuleOptions.user = {
        fields: {
          id: 'idField',
          email: 'loginField',
          password: 'passwordField',
        },
      };

      mockUserService.findUnique.mockResolvedValue({
        idField: '1',
        loginField: 'email',
        passwordField: 'password',
        otherField: 'otherField',
      } as unknown as User);

      const res = await userPasswordService.getUserFromLogin('email');

      expect(res).toEqual({
        id: '1',
        email: 'email',
        password: 'password',
      });

      expect(mockUserService.findUnique).toHaveBeenCalledWith({
        where: { loginField: 'email' },
        select: { idField: true, loginField: true, passwordField: true },
      });
    });

    it('should return null if the user is not found from findUnique', async () => {
      mockUserService.findUnique.mockResolvedValue(null);
      const res = await userPasswordService.getUserFromLogin('email');

      expect(res).toBeNull();
    });

    it('should return null if findUnique does not return all the information needed', async () => {
      mockUserService.findUnique.mockResolvedValue({
        id: 'id ',
      } as unknown as User);
      const res = await userPasswordService.getUserFromLogin('email');

      expect(res).toBeNull();
    });
  });

  describe('updateUserPassword', () => {
    it('should return a user with the default options', async () => {
      await userPasswordService.updateUserPassword('1', 'new');

      expect(mockUserService.update).toHaveBeenCalledWith({
        where: { id: '1' },
        data: { password: 'new' },
      });
    });

    it('should return a user using the options set during the module configuration', async () => {
      mockPasswordModuleOptions.user = {
        fields: {
          id: 'idField',
          email: 'loginField',
          password: 'passwordField',
        },
      };

      await userPasswordService.updateUserPassword('1', 'new');

      expect(mockUserService.update).toHaveBeenCalledWith({
        where: { idField: '1' },
        data: { passwordField: 'new' },
      });
    });
  });
});
