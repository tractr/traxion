/* eslint-disable @typescript-eslint/unbound-method */
import { INestApplication } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { mockDeep, MockProxy } from 'jest-mock-extended';

import { ResetPasswordService } from './reset-password.service';
import { BadResetCodeError } from '../errors';
import { ResetPasswordModuleOptions } from '../interfaces';
import { MODULE_OPTIONS_TOKEN } from '../reset-password.module-definition';

import { UserNotFoundError } from '@trxn/nestjs-authentication';
import { MailerService } from '@trxn/nestjs-mailer';
import { MinimalUser, UserService } from '@trxn/nestjs-user';

describe('ResetPasswordService', () => {
  let app: INestApplication;
  let resetPasswordService: ResetPasswordService;
  let mockUserService: MockProxy<UserService>;
  let mockMailerService: MockProxy<MailerService>;
  let mockPasswordModuleOptions: MockProxy<ResetPasswordModuleOptions>;
  let mockJwtService: MockProxy<JwtService>;
  const mockReq = { headers: {}, hostname: 'localhost' };

  beforeEach(async () => {
    mockUserService = mockDeep<UserService>();
    mockJwtService = mockDeep<JwtService>();
    mockPasswordModuleOptions = mockDeep<ResetPasswordModuleOptions>(
      {
        funcPropSupport: true,
      },
      {
        from: 'from',
      },
    );
    mockMailerService = mockDeep<MailerService>();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ResetPasswordService,
        { provide: UserService, useValue: mockUserService },
        { provide: MailerService, useValue: mockMailerService },
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

    app = module.createNestApplication();
    await app.init();
  });

  it('should be defined', () => {
    expect(resetPasswordService).toBeDefined();
  });

  describe('userSecretFactory', () => {
    it('should generate a user secret', async () => {
      const { id, email, password }: MinimalUser = {
        id: 'id',
        email: 'email',
        password: 'password',
      };

      const request = app.get<Record<string, unknown>>(REQUEST);

      const userSecret = await resetPasswordService.userSecretFactory(request, {
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
      const { id, email, password }: MinimalUser = {
        id: 'id',
        email: 'email',
        password: 'password',
      };

      mockJwtService.verifyAsync.mockResolvedValue({ sub: id });

      await resetPasswordService.verifyResetCode(
        `${id}-${password}-${email}`,
        'code',
      );

      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(mockJwtService.verifyAsync).toHaveBeenCalledWith('code', {
        secret: `${id}-${password}-${email}`,
      });
    });
  });

  describe('resetCodeFactory', () => {
    it('should update the password with the default config value', async () => {
      mockPasswordModuleOptions.expiresIn = undefined;
      mockJwtService.sign.mockReturnValue('code');
      resetPasswordService.resetCodeFactory('id', 'secret');

      expect(mockJwtService.sign).toHaveBeenCalledWith(
        { sub: 'id' },
        { secret: 'secret', expiresIn: '24h' },
      );
    });
    it('should update the password', async () => {
      mockJwtService.sign.mockReturnValue('code');
      resetPasswordService.resetCodeFactory('id', 'secret', '1d');

      expect(mockJwtService.sign).toHaveBeenCalledWith(
        { sub: 'id' },
        { secret: 'secret', expiresIn: '1d' },
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

      mockJwtService.sign.mockReturnValue('code');
      mockUserService.findUserByLogin.mockResolvedValue({
        id,
        email,
        password,
      });
      const mockResetPasswordLinkFactory = jest.fn().mockResolvedValue('link');
      mockPasswordModuleOptions.linkFactory = mockResetPasswordLinkFactory;
      mockPasswordModuleOptions.requestPasswordEmailParams = (params) => ({
        ...params,
        context: {
          ...params.context,
          templateId: 'request-password',
        },
      });

      await resetPasswordService.requestResetPassword('email');

      expect(mockResetPasswordLinkFactory).toHaveBeenCalledWith(
        mockReq,
        'code',
        { id, email, password },
      );

      expect(mockMailerService.send).toHaveBeenCalledWith({
        from: 'from',
        to: email,
        subject: 'Reset your password',
        context: {
          email: 'email',
          link: 'link',
          resetCode: 'code',
          templateId: 'request-password',
        },
        html: expect.any(String),
      });
    });

    it('should throw if the user has not been found', async () => {
      mockUserService.findUserById.mockResolvedValue(null);

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

      mockJwtService.verifyAsync.mockResolvedValue({ sub: id });
      mockPasswordModuleOptions.updatePasswordSuccessEmailParams = (
        params,
      ) => ({
        ...params,
        context: {
          ...params.context,
          templateId: 'templateId',
        },
      });

      mockUserService.getIdFromUser.mockReturnValue(id);
      mockUserService.findUserById.mockResolvedValueOnce({
        id,
        email,
        password,
      });
      mockUserService.update.mockResolvedValueOnce({
        id,
        email,
        password,
      });

      await resetPasswordService.reset('id', 'code', 'newPassword');

      expect(mockMailerService.send).toHaveBeenCalledWith({
        from: 'from',
        to: email,
        subject: 'Password updated',
        context: {
          email: 'email',
          templateId: 'templateId',
        },
        html: expect.any(String),
      });
    });

    it('should throw if the user has not been found', async () => {
      mockUserService.findUserById.mockResolvedValue(null);

      await expect(async () =>
        resetPasswordService.reset('id', 'code', 'newPassword'),
      ).rejects.toEqual(new UserNotFoundError('User not found'));
    });

    it('should throw if the reset code is not correct', async () => {
      const { id, email, password } = {
        id: '1',
        email: 'email',
        password: 'password',
      };

      mockUserService.findUserById.mockResolvedValue({
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
