/* eslint-disable @typescript-eslint/unbound-method */

import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { mockDeep, MockProxy, mockReset } from 'jest-mock-extended';

import { AuthenticationService } from './authentication.service';
import { HashService } from './hash.service';
import { MODULE_OPTIONS_TOKEN } from '../authentication.module-definition';
import { AuthenticationModuleOptions } from '../interfaces';

import { MinimalUser, UserService } from '@trxn/nestjs-user';

describe('AuthService', () => {
  let authService: AuthenticationService;
  let mockJwtService: MockProxy<JwtService>;
  let mockUserService: MockProxy<UserService>;

  let mockAuthenticationModuleOptions: MockProxy<AuthenticationModuleOptions>;
  let mockHashService: MockProxy<HashService>;

  beforeEach(async () => {
    mockJwtService = mockDeep<JwtService>();
    mockUserService = mockDeep<UserService>();
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
          provide: UserService,
          useValue: mockUserService,
        },
        { provide: JwtService, useValue: mockJwtService },
        { provide: HashService, useValue: mockHashService },
      ],
    }).compile();

    authService = module.get<AuthenticationService>(AuthenticationService);
  });

  afterEach(() => {
    mockReset(mockJwtService);
    mockReset(mockUserService);
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
      } as MinimalUser;
      mockUserService.findUserByLogin.mockResolvedValueOnce(user);
      mockUserService.getUserPassword.mockResolvedValueOnce('hash');

      mockHashService.compare.mockResolvedValueOnce(true);

      const result = await authService.validateUser('login', 'password');

      expect(result).toBe(user);
    });

    it('should return null if the user is not validated', async () => {
      const user = {
        id: '1',
        email: 'login',
        password: 'password',
      } as MinimalUser;
      mockUserService.findUserByLogin.mockResolvedValueOnce(user);
      mockUserService.getUserPassword.mockResolvedValueOnce('hash');

      mockHashService.compare.mockResolvedValueOnce(false);

      let result = await authService.validateUser('login', 'password');
      expect(result).toBe(null);

      mockUserService.findUserByLogin.mockResolvedValueOnce(user);
      mockUserService.getPasswordFromUser.mockReturnValueOnce(null);
      result = await authService.validateUser('login', 'password');
      expect(result).toBe(null);

      mockUserService.findUserByLogin.mockResolvedValueOnce(null);
      result = await authService.validateUser('login', 'password');
      expect(result).toBe(null);
    });
  });

  describe('createAccessToken', () => {
    it('should create a User JWT with the transformJwtPayload from the config', async () => {
      const transformJwtPayload = jest
        .fn()
        .mockImplementation((payload) => ({ ...payload, id: 'test' }));
      mockAuthenticationModuleOptions.transformJwtPayload = transformJwtPayload;

      const user = {
        id: '1',
        email: 'login',
        password: 'password',
      } as MinimalUser;
      mockJwtService.sign.mockReturnValue('jwt');
      const compare = await authService.createAccessToken(user);

      expect(mockJwtService.sign).toHaveBeenCalledTimes(1);
      expect(mockJwtService.sign).toHaveBeenCalledWith({
        sub: user.id,
        id: 'test',
      });

      expect(transformJwtPayload).toHaveBeenCalledTimes(1);
      expect(transformJwtPayload).toHaveBeenCalledWith({ sub: '1' }, user);

      expect(compare).toEqual('jwt');
    });

    it('should create a User JWT', async () => {
      mockAuthenticationModuleOptions.transformJwtPayload = undefined;
      const user = {
        id: '1',
        email: 'login',
        password: 'password',
      } as MinimalUser;
      mockJwtService.sign.mockReturnValue('jwt');
      const compare = await authService.createAccessToken(user);

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
      } as MinimalUser;
      const { createAccessToken } = authService;
      const mockCreateUserJWT = jest.fn().mockReturnValue('jwt');
      authService.createAccessToken = mockCreateUserJWT;
      const loggedIn = await authService.login(user);
      authService.createAccessToken = createAccessToken;

      expect(mockCreateUserJWT).toHaveBeenCalledTimes(1);
      expect(mockCreateUserJWT).toHaveBeenCalledWith(user);

      expect(loggedIn).toEqual({ accessToken: 'jwt' });
    });
  });
});
