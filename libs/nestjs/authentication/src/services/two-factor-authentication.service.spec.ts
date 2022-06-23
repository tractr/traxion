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
import { UserType } from '../interfaces';
import { AuthenticationUserService } from './authentication-user.service';
import { AuthenticationService } from './authentication.service';
import { TwoFactorAuthenticationService } from './two-factor-authentification.service';

describe('TwoFactorAuthenticationService', () => {
  let twoFactorAuthService: TwoFactorAuthenticationService;

  let mockUserService: MockProxy<AuthenticationUserService>;
  let mockUser: MockProxy<{ id: string; otp: string; email: string }>;

  beforeEach(async () => {
    mockUserService = mockDeep<AuthenticationUserService>();
    mockUser = mockDeep<{ id: string; otp: string; email: string }>();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: AUTHENTICATION_USER_SERVICE, useValue: mockUserService },
      ],
    }).compile();

    twoFactorAuthService = module.get<TwoFactorAuthenticationService>(
      TwoFactorAuthenticationService,
    );
  });

  afterEach(() => {
    mockReset(mockUserService);
    mockReset(mockUser);
  });

  it('should be defined', () => {
    expect(twoFactorAuthService).toBeDefined();
  });

  describe('generateTwoFactorAuthenticationSecret', () => {
    it('should return otpAuthUrl', async () => {
      const otpAuthUrl =
        await twoFactorAuthService.generateTwoFactorAuthenticationSecret(
          mockUser,
        );
      expect(
        twoFactorAuthService.generateTwoFactorAuthenticationSecret,
      ).toHaveBeenCalledTimes(1);
      expect(
        twoFactorAuthService.generateTwoFactorAuthenticationSecret,
      ).toHaveBeenCalledWith(mockUser);
      expect(
        twoFactorAuthService.generateTwoFactorAuthenticationSecret,
      ).toEqual(otpAuthUrl);
    });
  });

  describe('generateTwoFactorAuthenticationSecret', () => {
    it('should return otpAuthUrl and update otp props from user', async () => {
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
        ...mockAuthenticationOptions.userConfig,
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
