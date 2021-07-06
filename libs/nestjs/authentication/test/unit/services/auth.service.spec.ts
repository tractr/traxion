/* eslint-disable @typescript-eslint/unbound-method */

import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import * as bcrypt from 'bcrypt';
import { MockProxy } from 'jest-mock-extended';

import { mockUserFactory } from '../../../generated/models/mock';
import {
  USER_SERVICE,
  UserService,
} from '../../../generated/nestjs-models-common';
import { mockUserServiceFactory } from '../../../generated/nestjs-models-common/mock';
import { User } from '../../../prisma/client';
import { AuthenticationService, UserNotFoundError } from '../../../src';
import { AUTHENTICATION_MODULE_OPTIONS } from '../../../src/constants/authentication.contants';
import { AuthenticationOptions } from '../../../src/interfaces';
import { mockAuthenticationOptionsFactory } from '../../mock/authentication-options.mock';
import { mockJwtServiceFactory } from '../../mock/jwt.service.mock';

describe('AuthService', () => {
  let authService: AuthenticationService;
  let mockAuthOptionsService: AuthenticationOptions;
  let mockJwtService: JwtService;
  let mockUserService: MockProxy<UserService>;
  let mockUser: User;
  let compareMock: jest.SpyInstance;
  let hashMock: jest.SpyInstance;
  let genSaltMock: jest.SpyInstance;

  beforeEach(async () => {
    compareMock = jest.spyOn(bcrypt, 'compare');
    hashMock = jest.spyOn(bcrypt, 'hash');
    genSaltMock = jest.spyOn(bcrypt, 'genSalt');

    mockJwtService = mockJwtServiceFactory();
    mockUserService = mockUserServiceFactory();
    mockAuthOptionsService = mockAuthenticationOptionsFactory();
    mockUser = mockUserFactory();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthenticationService,
        {
          provide: AUTHENTICATION_MODULE_OPTIONS,
          useValue: mockAuthOptionsService,
        },
        { provide: USER_SERVICE, useValue: mockUserService },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    authService = module.get<AuthenticationService>(AuthenticationService);
  });

  afterEach(() => {
    compareMock.mockRestore();
    hashMock.mockRestore();
    genSaltMock.mockRestore();
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('hashPassword', () => {
    it('should hash a password with bcrypt and the config from configService', async () => {
      genSaltMock.mockReturnValue('salt');
      hashMock.mockReturnValue('bcrypt');

      const hash = await authService.hashPassword('test');

      expect(genSaltMock).toHaveBeenCalledTimes(1);
      expect(genSaltMock).toHaveBeenCalledWith(10);
      expect(genSaltMock).toHaveReturnedWith('salt');

      expect(hashMock).toHaveBeenCalledTimes(1);
      expect(hashMock).toHaveBeenCalledWith('test', 'salt');
      expect(hashMock).toHaveReturnedWith('bcrypt');

      expect(hash).toEqual('bcrypt');
    });
  });

  describe('verifyPassword', () => {
    it('should verify a password with bcrypt', async () => {
      compareMock.mockReturnValue(true);

      const compare = await authService.verifyPassword('test', 'hash');

      expect(compareMock).toHaveBeenCalledTimes(1);
      expect(compareMock).toHaveBeenCalledWith('test', 'hash');
      expect(compareMock).toHaveReturnedWith(true);

      expect(compare).toEqual(true);
    });
  });

  describe('createUserJWT', () => {
    it('should create a User JWT', async () => {
      const compare = await authService.createUserJWT(mockUser);

      expect(mockJwtService.sign).toHaveBeenCalledTimes(1);
      expect(mockJwtService.sign).toHaveBeenCalledWith({ sub: mockUser.id });

      expect(compare).toEqual('jwt');
    });
  });

  describe('login', () => {
    it('should login a user and return an access token', async () => {
      const { createUserJWT } = authService;
      const mockCreateUserJWT = jest.fn().mockReturnValue('jwt');
      authService.createUserJWT = mockCreateUserJWT;
      const loggedIn = await authService.login(mockUser);
      authService.createUserJWT = createUserJWT;

      expect(mockCreateUserJWT).toHaveBeenCalledTimes(1);
      expect(mockCreateUserJWT).toHaveBeenCalledWith(mockUser);

      expect(loggedIn).toEqual({ accessToken: 'jwt' });
    });
  });

  describe('authenticateLoginCredentials', () => {
    it('should throw a UserNotFoundError if no user has been found by the login field', async () => {
      mockUserService.findUnique.mockReturnValueOnce(null as never);

      await expect(async () =>
        authService.authenticateLoginCredentials('login', 'password'),
      ).rejects.toThrow(UserNotFoundError);

      expect(mockUserService.findUnique).toHaveBeenCalledTimes(1);
      expect(mockUserService.findUnique).toHaveBeenCalledWith({
        select: {
          password: true,
        },
        where: {
          email: 'login',
        },
      });
    });
  });
});
