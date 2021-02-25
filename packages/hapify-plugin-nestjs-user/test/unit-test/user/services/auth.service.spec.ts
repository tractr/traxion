import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import * as bcrypt from 'bcrypt';

import {
  AuthenticationService,
  UserNotFoundError,
} from '../../../../src/authentication';
import { UserService } from '../../../../src/generated.example/user';
import { mockConfigServiceFactory } from '../../../mocks/config/config.service.mock';
import { mockJwtServiceFactory } from '../../../mocks/user/service/jwt.service.mock';
import {
  mockUser,
  mockUserServiceFactory,
} from '../../../mocks/user/service/user.service.mock';

jest.mock('bcrypt');
// const actualBcrypt = jest.requireActual('bcrypt');

describe('AuthService', () => {
  let bcryptCompare: jest.Mock;
  let bcryptHash: jest.Mock;
  let bcryptGenSalt: jest.Mock;

  let authService: AuthenticationService;
  let mockConfigService: ConfigService;
  let mockJwtService: JwtService;
  let mockUserService: UserService;

  beforeEach(async () => {
    bcryptCompare = jest.fn().mockReturnValue(true);
    bcryptHash = jest.fn().mockReturnValue('bcrypt');
    bcryptGenSalt = jest.fn().mockReturnValue('salt');
    (bcrypt.compare as jest.Mock) = bcryptCompare;
    (bcrypt.hash as jest.Mock) = bcryptHash;
    (bcrypt.genSalt as jest.Mock) = bcryptGenSalt;

    mockConfigService = mockConfigServiceFactory({
      'login.loginField': 'email',
      'login.password.saltLength': 20,
    });
    mockJwtService = mockJwtServiceFactory();
    mockUserService = mockUserServiceFactory();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthenticationService,
        { provide: ConfigService, useValue: mockConfigService },
        { provide: JwtService, useValue: mockJwtService },
        { provide: UserService, useValue: mockUserService },
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

      expect(mockConfigService.get).toHaveBeenCalledTimes(1);
      expect(mockConfigService.get).toHaveBeenCalledWith(
        'login.password.saltLength',
      );

      expect(bcryptGenSalt).toHaveBeenCalledTimes(1);
      expect(bcryptGenSalt).toHaveBeenCalledWith(20);

      expect(bcryptHash).toHaveBeenCalledTimes(1);
      expect(bcryptHash).toHaveBeenCalledWith('test', 'salt');

      expect(hash).toEqual('bcrypt');
    });
  });

  describe('verifyPassword', () => {
    it('should verify a password with bcrypt', async () => {
      const compare = await authService.verifyPassword('test', 'hash');

      expect(bcryptCompare).toHaveBeenCalledTimes(1);
      expect(bcryptCompare).toHaveBeenCalledWith('test', 'hash');

      expect(compare).toEqual(true);
    });
  });

  describe('createUserJWT', () => {
    it('should create a User JWT', async () => {
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

      expect(loggedIn).toEqual({ access_token: 'jwt' });
    });
  });

  describe('authenticateLoginCredentials', () => {
    it('should throw a UserNotFoundError if no user has been found by the login field', async () => {
      (mockUserService.findUnique as jest.Mock).mockReturnValueOnce(null);

      expect(
        authService.authenticateLoginCredentials('login', 'password'),
      ).rejects.toThrow(UserNotFoundError);

      expect(mockConfigService.get).toHaveBeenCalledTimes(1);
      expect(mockConfigService.get).toHaveBeenCalledWith('login.loginField');

      expect(mockUserService.findUnique).toHaveBeenCalledTimes(1);
      expect(mockUserService.findUnique).toHaveBeenCalledWith(
        { email: 'login' },
        { select: { password: true } },
      );
    });

    // it('should authenticate the user with a login and email', async () => {
    //   bcrypt.hash = actualBcrypt.hash;
    //   bcrypt.genSalt = actualBcrypt.genSalt;
    //   const hashPassword = await actualBcrypt.hash;
    //   const hash = await authService.authenticateLoginCredentials(
    //     'login',
    //     'password'
    //   );

    //   expect(mockConfigService.get).toHaveBeenCalledTimes(1);
    //   expect(mockConfigService.get).toHaveBeenCalledWith(
    //     'login.password.saltLength'
    //   );
    // });
  });
});
