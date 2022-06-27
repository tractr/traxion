/* eslint-disable @typescript-eslint/unbound-method */

import { getMockRes } from '@jest-mock/express';
import { Test, TestingModule } from '@nestjs/testing';
import { mockDeep, MockProxy, mockReset } from 'jest-mock-extended';

import {
  AUTHENTICATION_MODULE_OPTIONS,
  AUTHENTICATION_USER_SERVICE,
} from '../constants';
import { AuthenticationOptions } from '../dtos';
import { AuthenticationUserService } from './authentication-user.service';
import { TwoFactorAuthenticationService } from './two-factor-authentification.service';

describe('TwoFactorAuthenticationService', () => {
  let twoFactorAuthService: TwoFactorAuthenticationService;
  let mockUserService: MockProxy<AuthenticationUserService>;
  let mockAuthenticationOptions: MockProxy<AuthenticationOptions>;
  let mockUser: MockProxy<{ id: string; otp: string; email: string }>;

  describe('WHEN OTP IS NOT ENABLED', () => {
    beforeEach(async () => {
      mockUserService = mockDeep<AuthenticationUserService>();
      mockUser = mockDeep<{ id: string; otp: string; email: string }>();
      mockAuthenticationOptions = mockDeep<AuthenticationOptions>();
      mockAuthenticationOptions.otp = false;

      const module: TestingModule = await Test.createTestingModule({
        providers: [
          TwoFactorAuthenticationService,
          { provide: AUTHENTICATION_USER_SERVICE, useValue: mockUserService },
          {
            provide: AUTHENTICATION_MODULE_OPTIONS,
            useValue: mockAuthenticationOptions,
          },
        ],
      }).compile();

      twoFactorAuthService = module.get<TwoFactorAuthenticationService>(
        TwoFactorAuthenticationService,
      );
    });

    it('generateTwoFactorAuthenticationSecret should throw error if otp mode is not activated', async () => {
      await expect(async () =>
        twoFactorAuthService.generateTwoFactorAuthenticationSecret(mockUser),
      ).rejects.toThrow('OTP mode is not enabled');
    });
    it('isTwoFactorAuthenticationCodeValid should throw error if otp mode is not activated', async () => {
      await expect(async () =>
        twoFactorAuthService.isTwoFactorAuthenticationCodeValid(
          'test',
          mockUser,
        ),
      ).rejects.toThrow('OTP mode is not enabled');
    });
    it('pipeQrCodeStream should throw error if otp mode is not activated', async () => {
      const { res } = getMockRes();
      await expect(async () =>
        twoFactorAuthService.pipeQrCodeStream(res, 'test'),
      ).rejects.toThrow('OTP mode is not enabled');
    });
  });

  describe('WHEN OTP IS ENABLED', () => {
    beforeEach(async () => {
      mockUserService = mockDeep<AuthenticationUserService>();
      mockUser = mockDeep<{ id: string; otp: string; email: string }>();
      mockAuthenticationOptions = mockDeep<AuthenticationOptions>();
      mockAuthenticationOptions.otp = false;

      const module: TestingModule = await Test.createTestingModule({
        providers: [
          TwoFactorAuthenticationService,
          { provide: AUTHENTICATION_USER_SERVICE, useValue: mockUserService },
          {
            provide: AUTHENTICATION_MODULE_OPTIONS,
            useValue: mockAuthenticationOptions,
          },
        ],
      }).compile();

      twoFactorAuthService = module.get<TwoFactorAuthenticationService>(
        TwoFactorAuthenticationService,
      );
    });
    afterEach(() => {
      mockReset(mockUserService);
      mockReset(mockAuthenticationOptions);
      mockReset(mockUser);
    });
    it('should be defined', () => {
      expect(twoFactorAuthService).toBeDefined();
    });
    describe('generateTwoFactorAuthenticationSecret', () => {
      it('should return otpAuthUrl', async () => {
        const mockAuthenticatorKeyUri = jest.fn().mockReturnValue('otpAuthUrl');
        twoFactorAuthService.generateTwoFactorAuthenticationSecret =
          mockAuthenticatorKeyUri;

        const result =
          await twoFactorAuthService.generateTwoFactorAuthenticationSecret(
            mockUser,
          );
        expect(
          twoFactorAuthService.generateTwoFactorAuthenticationSecret,
        ).toHaveBeenCalledTimes(1);
        expect(
          twoFactorAuthService.generateTwoFactorAuthenticationSecret,
        ).toHaveBeenCalledWith(mockUser);
        expect(result).toEqual('otpAuthUrl');
      });
    });
    describe('isTwoFactorAuthenticationCodeValid', () => {
      it('should return a boolean value', async () => {
        const mockBoolean = jest.fn().mockReturnValue(true);
        twoFactorAuthService.isTwoFactorAuthenticationCodeValid = mockBoolean;
        const result = twoFactorAuthService.isTwoFactorAuthenticationCodeValid(
          'test',
          mockUser,
        );
        expect(
          twoFactorAuthService.isTwoFactorAuthenticationCodeValid,
        ).toHaveBeenCalledTimes(1);
        expect(
          twoFactorAuthService.isTwoFactorAuthenticationCodeValid,
        ).toHaveBeenCalledWith('test', mockUser);
        expect(result).toEqual(true);
      });
    });
    describe('pipeQrCodeStream', () => {
      it('should return otpAuthUrl', async () => {
        const mockFileStream = jest.fn().mockResolvedValueOnce('promise');
        twoFactorAuthService.pipeQrCodeStream = mockFileStream;
        const { res } = getMockRes();
        const result = await twoFactorAuthService.pipeQrCodeStream(res, 'test');
        expect(twoFactorAuthService.pipeQrCodeStream).toHaveBeenCalledTimes(1);
        expect(twoFactorAuthService.pipeQrCodeStream).toHaveBeenCalledWith(
          res,
          'test',
        );
        expect(result).toEqual('promise');
      });
    });
  });
});
