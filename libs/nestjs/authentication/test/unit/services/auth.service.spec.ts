/* eslint-disable @typescript-eslint/unbound-method */
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { MockProxy } from 'jest-mock-extended';

import { AuthenticationService, UserNotFoundError } from '../../../src';
import { AUTHENTICATION_MODULE_OPTIONS } from '../../../src/constants/authentication.contants';
import { AuthenticationOptions } from '../../../src/interfaces';
import { mockAuthenticationOptionsFactory } from '../../mock/authentication-options.mock';
import { mockJwtServiceFactory } from '../../mock/jwt.service.mock';

import { mockUserFactory } from '@generated/models/mock';
import { USER_SERVICE, UserService } from '@generated/nestjs-models-common';
import { mockUserServiceFactory } from '@generated/nestjs-models-common/mock';

jest.mock('bcrypt', () => ({
  compare: jest.fn().mockReturnValue(true),
  hash: jest.fn().mockReturnValue('bcrypt'),
  genSalt: jest.fn().mockReturnValue('salt'),
}));

describe('AuthService', () => {
  let authService: AuthenticationService;
  let mockAuthOptionsService: AuthenticationOptions;
  let mockJwtService: JwtService;
  let mockUserService: MockProxy<UserService>;
  let mockUser: User;

  beforeEach(async () => {
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

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('hashPassword', () => {
    it('should hash a password with bcrypt and the config from configService', async () => {
      const hash = await authService.hashPassword('test');

      expect(bcrypt.genSalt).toHaveBeenCalledTimes(1);
      expect(bcrypt.genSalt).toHaveBeenCalledWith(20);

      expect(bcrypt.hash).toHaveBeenCalledTimes(1);
      expect(bcrypt.hash).toHaveBeenCalledWith('test', 'salt');

      expect(hash).toEqual('bcrypt');
    });
  });

  describe('verifyPassword', () => {
    it('should verify a password with bcrypt', async () => {
      const compare = await authService.verifyPassword('test', 'hash');

      expect(bcrypt.compare).toHaveBeenCalledTimes(1);
      expect(bcrypt.compare).toHaveBeenCalledWith('test', 'hash');

      expect(compare).toEqual(true);
    });
  });

  describe('createUserJWT', () => {
    it('should create a User JWT', async () => {
      const compare = await authService.createUserJWT(mockUser);
      const { signAsync } = mockJwtService;

      expect(signAsync).toHaveBeenCalledTimes(1);
      expect(signAsync).toHaveBeenCalledWith({ sub: mockUser.id });

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
      mockUserService.findUnique.mockReturnValueOnce(null);

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
