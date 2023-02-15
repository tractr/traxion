/* eslint-disable @typescript-eslint/unbound-method */

import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from '@prisma/client';
import { mockDeep, MockProxy, mockReset } from 'jest-mock-extended';

import { AuthenticationService } from './authentication.service';
import { HashService } from './hash.service';
import { UserAuthenticationService } from './user-authentication.service';
import { MODULE_OPTIONS_TOKEN } from '../authentication.module-definition';
import { AuthenticationModuleOptions } from '../interfaces';

describe('AuthService', () => {
  let authService: AuthenticationService;
  let mockJwtService: MockProxy<JwtService>;
  let mockUserAuthenticationService: MockProxy<UserAuthenticationService>;

  let mockAuthenticationModuleOptions: MockProxy<AuthenticationModuleOptions>;
  let mockHashService: MockProxy<HashService>;

  beforeEach(async () => {
    mockJwtService = mockDeep<JwtService>();
    mockUserAuthenticationService = mockDeep<UserAuthenticationService>();
    mockHashService = mockDeep<HashService>();
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
        { provide: HashService, useValue: mockHashService },
      ],
    }).compile();

    authService = module.get<AuthenticationService>(AuthenticationService);
  });

  afterEach(() => {
    mockReset(mockJwtService);
    mockReset(mockUserAuthenticationService);
    mockReset(mockHashService);
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

      mockHashService.compare.mockResolvedValueOnce(true);

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

      mockHashService.compare.mockResolvedValueOnce(false);

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
