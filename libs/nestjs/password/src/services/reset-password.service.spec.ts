import { REQUEST } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { mockDeep, MockProxy } from 'jest-mock-extended';

import { BadResetCodeError } from '../errors';
import { PasswordModuleOptions } from '../interfaces';
import { MODULE_OPTIONS_TOKEN } from '../password.module-definition';
import { ResetPasswordService } from './reset-password.service';
import { UserPasswordService } from './user-password.service';

import { UserNotFoundError } from '@tractr/nestjs-authentication';

describe('ResetPasswordService', () => {
  let resetPasswordService: ResetPasswordService;
  let mockUserPasswordService: MockProxy<UserPasswordService>;
  let mockPasswordModuleOptions: MockProxy<PasswordModuleOptions>;
  let mockJwtService: MockProxy<JwtService>;
  const mockReq = { headers: {}, hostname: 'localhost' };

  beforeEach(async () => {
    mockUserPasswordService = mockDeep<UserPasswordService>();
    mockJwtService = mockDeep<JwtService>();
    mockPasswordModuleOptions = mockDeep<PasswordModuleOptions>({});

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ResetPasswordService,
        { provide: UserPasswordService, useValue: mockUserPasswordService },
        { provide: JwtService, useValue: mockJwtService },
        {
          provide: MODULE_OPTIONS_TOKEN,
          useValue: mockPasswordModuleOptions,
        },
      ],
    })
      .overrideProvider(REQUEST)
      .useValue(mockReq)
      .compile();

    resetPasswordService =
      module.get<ResetPasswordService>(ResetPasswordService);
  });

  it('should be defined', () => {
    expect(resetPasswordService).toBeDefined();
  });

  describe('getUserSecret', () => {
    it('should generate a user secret', async () => {
      const { id, email, password } = {
        id: 'id',
        email: 'email',
        password: 'password',
      };

      const userSecret = resetPasswordService.getUserSecret({
        id,
        email,
        password,
      });

      expect(userSecret).toBeDefined();
      expect(userSecret).toEqual(`${id}-${password}-${email}`);
    });
  });

  describe('verifyResetCode', () => {
    it('should verify with jwtService that a code is good', async () => {
      const { id, email, password } = {
        id: 'id',
        email: 'email',
        password: 'password',
      };

      mockJwtService.verifyAsync.mockResolvedValue({ sub: id });

      await resetPasswordService.verifyResetCode(
        { id, email, password },
        'code',
      );

      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(mockJwtService.verifyAsync).toHaveBeenCalledWith('code', {
        secret: resetPasswordService.getUserSecret({ id, email, password }),
      });
    });
  });

  describe('createResetCode', () => {
    it('should update the password with the default config value', async () => {
      const { id, email, password } = {
        id: 'id',
        email: 'email',
        password: 'password',
      };

      mockPasswordModuleOptions.resetPasswordExpiresIn = undefined;
      mockJwtService.sign.mockReturnValue('code');
      resetPasswordService.createResetCode({ id, email, password });

      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(mockJwtService.sign).toHaveBeenCalledWith(
        {
          sub: 'id',
        },
        {
          secret: resetPasswordService.getUserSecret({ id, email, password }),
          expiresIn: '24h',
        },
      );
    });
    it('should update the password', async () => {
      const { id, email, password } = {
        id: 'id',
        email: 'email',
        password: 'password',
      };

      mockPasswordModuleOptions.resetPasswordExpiresIn = '1d';
      mockJwtService.sign.mockReturnValue('code');
      resetPasswordService.createResetCode({ id, email, password });

      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(mockJwtService.sign).toHaveBeenCalledWith(
        {
          sub: 'id',
        },
        {
          secret: resetPasswordService.getUserSecret({ id, email, password }),
          expiresIn: '1d',
        },
      );
    });
  });

  describe('requestResetPassword', () => {
    it('should request a new reset password', async () => {
      const { id, email, password } = {
        id: '1',
        email: 'email',
        password: 'password',
      };
      const mockSendRequestEmail = jest.fn();

      mockJwtService.sign.mockReturnValue('code');
      mockUserPasswordService.getUserFromLogin.mockResolvedValue({
        id,
        email,
        password,
      });
      mockUserPasswordService.getUserFromUserInfo.mockReturnValue({
        id,
        email,
        password,
      });
      const mockResetPasswordLinkFactory = jest.fn().mockResolvedValue('link');
      mockPasswordModuleOptions.resetPasswordLinkFactory =
        mockResetPasswordLinkFactory;
      mockPasswordModuleOptions.resetPasswordSendEmail = {
        request: mockSendRequestEmail,
      };

      await resetPasswordService.requestResetPassword('email');

      expect(mockResetPasswordLinkFactory).toHaveBeenCalledWith(
        mockReq,
        'code',
        { id, email, password },
      );

      expect(mockSendRequestEmail).toHaveBeenCalledWith('link', 'code', {
        id,
        email,
        password,
      });
    });

    it('should throw if the user has not been found', async () => {
      mockUserPasswordService.getUserFromId.mockResolvedValue(null);

      await expect(async () =>
        resetPasswordService.requestResetPassword('1'),
      ).rejects.toEqual(new UserNotFoundError('User not found'));
    });
  });

  describe('reset', () => {
    it('should reset a password', async () => {
      const { id, email, password } = {
        id: '1',
        email: 'email',
        password: 'password',
      };

      const mockSendUpdatedEmail = jest.fn();

      mockJwtService.verifyAsync.mockResolvedValue({ sub: id });
      mockPasswordModuleOptions.resetPasswordSendEmail = {
        updated: mockSendUpdatedEmail,
      };
      mockUserPasswordService.getUserFromId.mockResolvedValue({
        id,
        email,
        password,
      });
      mockUserPasswordService.getUserFromUserInfo.mockReturnValue({
        id,
        email,
        password,
      });

      await resetPasswordService.reset('id', 'code', 'newPassword');

      expect(mockSendUpdatedEmail).toHaveBeenCalledWith({
        id,
        email,
        password,
      });
    });

    it('should throw if the user has not been found', async () => {
      mockUserPasswordService.getUserFromId.mockResolvedValue(null);

      await expect(async () =>
        resetPasswordService.reset('id', 'code', 'newPassword'),
      ).rejects.toEqual(new UserNotFoundError('User not found'));
    });

    it('should throw if the user has not been found', async () => {
      const { id, email, password } = {
        id: '1',
        email: 'email',
        password: 'password',
      };

      mockUserPasswordService.getUserFromId.mockResolvedValue({
        id,
        email,
        password,
      });
      mockJwtService.verifyAsync.mockResolvedValue({});

      await expect(async () =>
        resetPasswordService.reset('id', 'code', 'newPassword'),
      ).rejects.toEqual(new BadResetCodeError());

      mockJwtService.verifyAsync.mockResolvedValue({ sub: 'test' });

      await expect(async () =>
        resetPasswordService.reset('id', 'code', 'newPassword'),
      ).rejects.toEqual(new BadResetCodeError());

      mockJwtService.verifyAsync.mockImplementation(() => {
        throw new Error();
      });

      await expect(async () =>
        resetPasswordService.reset('id', 'code', 'newPassword'),
      ).rejects.toEqual(new BadResetCodeError());
    });
  });
});
