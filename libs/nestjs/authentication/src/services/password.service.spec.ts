/* eslint-disable @typescript-eslint/unbound-method */

import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { mockDeep, MockProxy, mockReset } from 'jest-mock-extended';

import {
  AUTHENTICATION_MODULE_OPTIONS,
  AUTHENTICATION_USER_SERVICE,
} from '../constants';
import { AuthenticationOptions } from '../dtos';
import { BadPasswordError, UserNotFoundError } from '../errors';
import { UserType } from '../interfaces';
import { AuthenticationUserService } from './authentication-user.service';
import { AuthenticationService } from './authentication.service';
import { PasswordService } from './password.service';

import { MailerService } from '@tractr/nestjs-mailer';

describe('AuthService', () => {
  let passwordService: PasswordService;
  let mockAuthenticationOptions: MockProxy<AuthenticationOptions>;
  let mockAuthenticationService: MockProxy<AuthenticationService>;
  let mockJwtService: MockProxy<JwtService>;
  let mockUserService: MockProxy<AuthenticationUserService>;
  let mockUser: MockProxy<UserType>;

  beforeEach(async () => {
    mockJwtService = mockDeep<JwtService>();
    mockUserService = mockDeep<AuthenticationUserService>();
    mockAuthenticationOptions = mockDeep<AuthenticationOptions>();
    mockAuthenticationService = mockDeep<AuthenticationService>();
    mockUser = mockDeep<UserType>();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PasswordService,
        {
          provide: AUTHENTICATION_MODULE_OPTIONS,
          useValue: mockAuthenticationOptions,
        },
        { provide: AUTHENTICATION_USER_SERVICE, useValue: mockUserService },
        { provide: AuthenticationService, useValue: mockAuthenticationService },
        { provide: JwtService, useValue: mockJwtService },
        { provide: MailerService, useValue: mockJwtService },
      ],
    }).compile();

    passwordService = module.get<PasswordService>(PasswordService);
  });

  afterEach(() => {
    mockReset(mockAuthenticationOptions);
    mockReset(mockJwtService);
    mockReset(mockUserService);
    mockReset(mockUser);
  });

  it('should be defined', () => {
    expect(passwordService).toBeDefined();
  });

  describe('updatePassword', () => {
    it('should update the password', async () => {
      mockUser.password = 'password';
      mockUserService.findUnique.mockResolvedValue(mockUser);
      mockAuthenticationService.verifyPassword.mockResolvedValue(true);
      mockUserService.update.mockResolvedValue(mockUser);

      await passwordService.updatePassword('1', 'old', 'new');

      expect(mockAuthenticationService.verifyPassword).toHaveBeenCalledWith(
        'old',
        mockUser.password,
      );
      expect(mockUserService.update).toHaveBeenCalledWith({
        where: { id: '1' },
        data: { password: 'new' },
      });
    });

    it('should throw if the user has not been found', async () => {
      mockUser.password = 'password';
      mockUserService.findUnique.mockResolvedValue(null);
      mockAuthenticationService.verifyPassword.mockResolvedValue(true);
      mockUserService.update.mockResolvedValue(mockUser);

      await expect(async () =>
        passwordService.updatePassword('1', 'old', 'new'),
      ).rejects.toEqual(new UserNotFoundError('User not found'));
    });

    it('should throw if the old password is not right', async () => {
      mockUser.password = 'password';
      mockUserService.findUnique.mockResolvedValue(mockUser);
      mockAuthenticationService.verifyPassword.mockResolvedValue(false);
      mockUserService.update.mockResolvedValue(mockUser);

      await expect(async () =>
        passwordService.updatePassword('1', 'old', 'new'),
      ).rejects.toEqual(new BadPasswordError());
    });
  });
});
