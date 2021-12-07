/* eslint-disable @typescript-eslint/unbound-method */

import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import * as bcrypt from 'bcrypt';
import { mockDeep, MockProxy, mockReset } from 'jest-mock-extended';

import {
  AUTHENTICATION_MODULE_OPTIONS,
  AUTHENTICATION_USER_SERVICE,
} from '../constants';
import { AuthenticationOptions } from '../dtos';
import { UserNotFoundError } from '../errors';
import { User } from '../interfaces';
import { AuthenticationUserService } from './authentication-user.service';
import { AuthenticationService } from './authentication.service';

describe('AuthService', () => {
  let authService: AuthenticationService;
  let mockAuthenticationOptions: MockProxy<AuthenticationOptions>;
  let mockJwtService: MockProxy<JwtService>;
  let mockUserService: MockProxy<AuthenticationUserService>;
  let mockUser: MockProxy<User>;
  let mockBcryptCompare: jest.SpyInstance;
  let mockBcryptHash: jest.SpyInstance;
  let mockBcryptGenSalt: jest.SpyInstance;

  beforeEach(async () => {
    mockBcryptCompare = jest.spyOn(bcrypt, 'compare');
    mockBcryptHash = jest.spyOn(bcrypt, 'hash');
    mockBcryptGenSalt = jest.spyOn(bcrypt, 'genSalt');

    mockJwtService = mockDeep<JwtService>();
    mockUserService = mockDeep<AuthenticationUserService>();
    mockAuthenticationOptions = mockDeep<AuthenticationOptions>();
    mockUser = mockDeep<User>();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthenticationService,
        {
          provide: AUTHENTICATION_MODULE_OPTIONS,
          useValue: mockAuthenticationOptions,
        },
        { provide: AUTHENTICATION_USER_SERVICE, useValue: mockUserService },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    authService = module.get<AuthenticationService>(AuthenticationService);
  });

  afterEach(() => {
    mockBcryptCompare.mockRestore();
    mockBcryptHash.mockRestore();
    mockBcryptGenSalt.mockRestore();
    mockReset(mockAuthenticationOptions);
    mockReset(mockJwtService);
    mockReset(mockUserService);
    mockReset(mockUser);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('hashPassword', () => {
    it('should hash a password with bcrypt and the config from configService', async () => {
      mockAuthenticationOptions.password.saltRounds = 10;
      mockBcryptGenSalt.mockReturnValue('salt');
      mockBcryptHash.mockReturnValue('bcrypt');

      const hash = await authService.hashPassword('test');

      expect(mockBcryptGenSalt).toHaveBeenCalledTimes(1);
      expect(mockBcryptGenSalt).toHaveBeenCalledWith(10);
      expect(mockBcryptGenSalt).toHaveReturnedWith('salt');

      expect(mockBcryptHash).toHaveBeenCalledTimes(1);
      expect(mockBcryptHash).toHaveBeenCalledWith('test', 'salt');
      expect(mockBcryptHash).toHaveReturnedWith('bcrypt');

      expect(hash).toEqual('bcrypt');
    });
  });

  describe('verifyPassword', () => {
    it('should verify a password with bcrypt', async () => {
      mockBcryptCompare.mockReturnValue(true);

      const compare = await authService.verifyPassword('test', 'hash');

      expect(mockBcryptCompare).toHaveBeenCalledTimes(1);
      expect(mockBcryptCompare).toHaveBeenCalledWith('test', 'hash');
      expect(mockBcryptCompare).toHaveReturnedWith(true);

      expect(compare).toEqual(true);
    });
  });

  describe('createUserJWT', () => {
    it('should create a User JWT', async () => {
      mockUser.id = 'id';
      mockJwtService.sign.mockReturnValue('jwt');
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
      mockAuthenticationOptions.userConfig = {
        loginField: 'loginFieldTest',
        emailField: 'emailFieldTest',
        passwordField: 'passwordFieldTest',
        idField: 'idFieldTest',
      };

      mockUserService.findUnique.mockReturnValueOnce(Promise.resolve(null));

      await expect(async () =>
        authService.authenticateLoginCredentials('login', 'password'),
      ).rejects.toThrow(UserNotFoundError);

      expect(mockUserService.findUnique).toHaveBeenCalledTimes(1);
      expect(mockUserService.findUnique).toHaveBeenCalledWith({
        where: {
          loginFieldTest: 'login',
        },
      });
    });
  });
});
