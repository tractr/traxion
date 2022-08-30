/* eslint-disable @typescript-eslint/unbound-method */

import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { mockDeep, MockProxy, mockReset } from 'jest-mock-extended';

import { MODULE_OPTIONS_TOKEN } from '../authentication.module-definition';
import { AuthenticationModuleOptions } from '../interfaces';
import { AuthenticationService } from './authentication.service';
import { UserAuthenticationService } from './user-authentication.service';

describe('AuthService', () => {
  let authService: AuthenticationService;
  let mockJwtService: MockProxy<JwtService>;
  let mockUserAuthenticationService: MockProxy<UserAuthenticationService>;
  let mockBcryptCompare: jest.SpyInstance;
  let mockBcryptHash: jest.SpyInstance;
  let mockBcryptGenSalt: jest.SpyInstance;

  let mockAuthenticationModuleOptions: MockProxy<AuthenticationModuleOptions>;

  beforeEach(async () => {
    mockBcryptCompare = jest.spyOn(bcrypt, 'compare');
    mockBcryptHash = jest.spyOn(bcrypt, 'hash');
    mockBcryptGenSalt = jest.spyOn(bcrypt, 'genSalt');

    mockJwtService = mockDeep<JwtService>();
    mockUserAuthenticationService = mockDeep<UserAuthenticationService>();
    mockAuthenticationModuleOptions =
      mockDeep<AuthenticationModuleOptions>() as MockProxy<AuthenticationModuleOptions>;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthenticationService,
        {
          provide: MODULE_OPTIONS_TOKEN,
          useValue: mockAuthenticationModuleOptions,
        },
        {
          provide: UserAuthenticationService,
          useValue: mockUserAuthenticationService,
        },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    authService = module.get<AuthenticationService>(AuthenticationService);
  });

  afterEach(() => {
    mockBcryptCompare.mockRestore();
    mockBcryptHash.mockRestore();
    mockBcryptGenSalt.mockRestore();
    mockReset(mockJwtService);
    mockReset(mockUserAuthenticationService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('validateUser', () => {
    it('should validate the user login and password', async () => {
      const user = {
        id: '1',
        email: 'login',
        password: 'password',
      } as User;
      mockUserAuthenticationService.getUserFromLogin.mockResolvedValueOnce(
        user,
      );
      mockUserAuthenticationService.getPasswordFromUser.mockResolvedValueOnce(
        'hash',
      );

      const spyComparePassword = jest.spyOn(authService, 'comparePasswordHash');
      spyComparePassword.mockResolvedValueOnce(true);

      const result = await authService.validateUser('login', 'password');

      expect(result).toBe(user);
    });

    it('should return null if the user is not validated', async () => {
      const user = {
        id: '1',
        email: 'login',
        password: 'password',
      } as User;
      mockUserAuthenticationService.getUserFromLogin.mockResolvedValueOnce(
        user,
      );
      mockUserAuthenticationService.getPasswordFromUser.mockResolvedValueOnce(
        'hash',
      );

      const spyComparePassword = jest.spyOn(authService, 'comparePasswordHash');
      spyComparePassword.mockResolvedValueOnce(false);

      let result = await authService.validateUser('login', 'password');
      expect(result).toBe(null);

      mockUserAuthenticationService.getUserFromLogin.mockResolvedValueOnce(
        user,
      );
      mockUserAuthenticationService.getPasswordFromUser.mockResolvedValueOnce(
        null,
      );
      result = await authService.validateUser('login', 'password');
      expect(result).toBe(null);

      mockUserAuthenticationService.getUserFromLogin.mockResolvedValueOnce(
        null,
      );
      result = await authService.validateUser('login', 'password');
      expect(result).toBe(null);
    });
  });

  describe('generatePasswordHash', () => {
    it('should hash a password with the generatePasswordHash from the config', async () => {
      const spyGeneratePasswordHash = jest.fn().mockReturnValue('bcrypt');
      mockAuthenticationModuleOptions.generatePasswordHash =
        spyGeneratePasswordHash;

      const hash = await authService.generatePasswordHash('test');

      expect(spyGeneratePasswordHash).toHaveBeenCalledTimes(1);
      expect(spyGeneratePasswordHash).toHaveBeenCalledWith('test');
      expect(spyGeneratePasswordHash).toHaveReturnedWith('bcrypt');

      expect(mockBcryptGenSalt).toHaveBeenCalledTimes(0);
      expect(mockBcryptHash).toHaveBeenCalledTimes(0);

      expect(hash).toEqual('bcrypt');
    });

    it('should hash a password with the defaults', async () => {
      mockAuthenticationModuleOptions.generatePasswordHash = undefined;
      mockBcryptGenSalt.mockReturnValue('salt');
      mockBcryptHash.mockReturnValue('bcrypt');

      const hash = await authService.generatePasswordHash('test');

      expect(mockBcryptGenSalt).toHaveBeenCalledTimes(1);
      expect(mockBcryptGenSalt).toHaveBeenCalledWith(10);
      expect(mockBcryptGenSalt).toHaveReturnedWith('salt');

      expect(mockBcryptHash).toHaveBeenCalledTimes(1);
      expect(mockBcryptHash).toHaveBeenCalledWith('test', 'salt');
      expect(mockBcryptHash).toHaveReturnedWith('bcrypt');

      expect(hash).toEqual('bcrypt');
    });
  });

  describe('comparePasswordHash', () => {
    it('should verify a password with the comparePasswordHash from the config', async () => {
      const spyComparePasswordHash = jest.fn().mockReturnValue(true);
      mockAuthenticationModuleOptions.comparePasswordHash =
        spyComparePasswordHash;

      const compare = await authService.comparePasswordHash('test', 'hash');

      expect(mockBcryptCompare).toHaveBeenCalledTimes(0);

      expect(spyComparePasswordHash).toHaveBeenCalledTimes(1);
      expect(spyComparePasswordHash).toHaveBeenCalledWith('test', 'hash');
      expect(spyComparePasswordHash).toHaveReturnedWith(true);

      expect(compare).toEqual(true);
    });

    it('should verify a password with the comparePasswordHash from the config', async () => {
      mockAuthenticationModuleOptions.comparePasswordHash = undefined;
      mockBcryptCompare.mockReturnValue(true);

      const compare = await authService.comparePasswordHash('test', 'hash');

      expect(mockBcryptCompare).toHaveBeenCalledTimes(1);
      expect(mockBcryptCompare).toHaveBeenCalledWith('test', 'hash');
      expect(mockBcryptCompare).toHaveReturnedWith(true);

      expect(compare).toEqual(true);
    });
  });

  describe('createUserJWT', () => {
    it('should create a User JWT with the getUserJWT from the config', async () => {
      const spyGetUserJWT = jest.fn().mockReturnValue({ id: 'test' });
      mockAuthenticationModuleOptions.getUserJWT = spyGetUserJWT;

      const user = {
        id: '1',
        email: 'login',
        password: 'password',
      } as User;
      mockJwtService.sign.mockReturnValue('jwt');
      const compare = await authService.createUserJWT(user);

      expect(mockJwtService.sign).toHaveBeenCalledTimes(1);
      expect(mockJwtService.sign).toHaveBeenCalledWith({
        sub: user.id,
        id: 'test',
      });

      expect(spyGetUserJWT).toHaveBeenCalledTimes(1);
      expect(spyGetUserJWT).toHaveBeenCalledWith(user);

      expect(compare).toEqual('jwt');
    });

    it('should create a User JWT', async () => {
      mockAuthenticationModuleOptions.getUserJWT = undefined;
      const user = {
        id: '1',
        email: 'login',
        password: 'password',
      } as User;
      mockJwtService.sign.mockReturnValue('jwt');
      const compare = await authService.createUserJWT(user);

      expect(mockJwtService.sign).toHaveBeenCalledTimes(1);
      expect(mockJwtService.sign).toHaveBeenCalledWith({ sub: user.id });

      expect(compare).toEqual('jwt');
    });
  });

  describe('login', () => {
    it('should login a user and return an access token', async () => {
      const user = {
        id: '1',
        email: 'login',
        password: 'password',
      } as User;
      const { createUserJWT } = authService;
      const mockCreateUserJWT = jest.fn().mockReturnValue('jwt');
      authService.createUserJWT = mockCreateUserJWT;
      const loggedIn = await authService.login(user);
      authService.createUserJWT = createUserJWT;

      expect(mockCreateUserJWT).toHaveBeenCalledTimes(1);
      expect(mockCreateUserJWT).toHaveBeenCalledWith(user);

      expect(loggedIn).toEqual({ accessToken: 'jwt' });
    });
  });
});
