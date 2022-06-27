import { INestApplication, ValidationPipe } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { Test, TestingModule } from '@nestjs/testing';
import { mockDeep, MockProxy } from 'jest-mock-extended';
import * as request from 'supertest';

import { AuthenticationModule } from '../authentication.module';
import { AUTHENTICATION_MODULE_OPTIONS } from '../constants';
import { AuthenticationOptions } from '../dtos';
import { JwtGlobalAuthGuard } from '../guards';
import { UserType } from '../interfaces';
import {
  AuthenticationService,
  AuthenticationUserService,
  TwoFactorAuthenticationService,
} from '../services';

const AUTHENTICATION_MOCK_USER_SERVICE = 'AUTHENTICATION_MOCK_USER_SERVICE';

describe('Authentication Module with OTP mode enabled', () => {
  let app: INestApplication;
  let mockUserService: MockProxy<AuthenticationUserService>;
  let mockAuthenticationOptions: MockProxy<AuthenticationOptions>;
  let mockTwoFactorAuthenticationService: MockProxy<TwoFactorAuthenticationService>;

  let mockUser: UserType;
  const mockFormatUser = jest.fn();

  beforeAll(async () => {
    mockUserService = mockDeep<AuthenticationUserService>();
    mockAuthenticationOptions = mockDeep<AuthenticationOptions>();
    mockTwoFactorAuthenticationService =
      mockDeep<TwoFactorAuthenticationService>();

    mockUser = {
      id: '1',
      email: 'test@email.com',
      password: 'password',
      otp: '123456',
    };

    const moduleFixture: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: TwoFactorAuthenticationService,
          useValue: mockTwoFactorAuthenticationService,
        },

        {
          provide: APP_GUARD,
          useClass: JwtGlobalAuthGuard,
        },
        {
          provide: AUTHENTICATION_MOCK_USER_SERVICE,
          useValue: mockUserService,
        },
        {
          provide: AUTHENTICATION_MODULE_OPTIONS,
          useValue: mockAuthenticationOptions,
        },
      ],
      imports: [
        AuthenticationModule.register({
          userConfig: {
            idField: 'id',
            emailField: 'email',
            loginField: 'email',
            passwordField: 'password',
            otpField: 'otp',
            formatUser: mockFormatUser,
          },
          jwtModuleOptions: {
            secret: 'integration-tests',
          },
          userService: AUTHENTICATION_MOCK_USER_SERVICE,
          otp: true,
        }),
      ],
    }).compile();

    mockUserService.findUnique.mockReturnValue(Promise.resolve(mockUser));

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        transformOptions: {
          enableImplicitConversion: false,
          exposeDefaultValues: true,
        },
      }),
    );

    await app.init();
  });

  beforeEach(() => {
    mockFormatUser.mockImplementation((user) => user);
  });

  afterEach(async () => {
    mockFormatUser.mockReset();
    mockUserService.findUnique.mockReset();
    if (app) await app.close();
  });

  describe('Route without token in header', () => {
    it('/2fa/generate should return 401', async () => {
      await request(app.getHttpServer()).post('/2fa/generate').expect(401);
    });
    it('/2fa/authenticate should return 401', async () => {
      await request(app.getHttpServer()).post('/2fa/authenticate').expect(401);
    });
  });

  describe('Route with token set in header', () => {
    it('/2fa/generate should return 201', async () => {
      const authenticationService = app.get<AuthenticationService>(
        AuthenticationService,
      );
      const accessToken = await authenticationService.createUserJWT(mockUser);

      mockUserService.findUnique.mockResolvedValue(Promise.resolve(mockUser));

      const response = await request(app.getHttpServer())
        .post('/2fa/generate')
        .set('Authorization', `bearer ${accessToken}`);

      expect(response.status).toBe(201);
    });
    it('/2fa/authenticate without body should return 400', async () => {
      const authenticationService = app.get<AuthenticationService>(
        AuthenticationService,
      );
      const accessToken = await authenticationService.createUserJWT(mockUser);

      mockUserService.findUnique.mockResolvedValue(Promise.resolve(mockUser));

      const response = await request(app.getHttpServer())
        .post('/2fa/authenticate')
        .set('Authorization', `bearer ${accessToken}`);

      expect(response.status).toBe(400);
      expect(response.body).toEqual(
        JSON.parse(
          JSON.stringify({
            error: 'Bad Request',
            message: ['code must be a string'],
            statusCode: 400,
          }),
        ),
      );
    });
    it('/2fa/authenticate with body should return 401 with wrong authorization code', async () => {
      const authenticationService = app.get<AuthenticationService>(
        AuthenticationService,
      );
      const accessToken = await authenticationService.createUserJWT(mockUser);

      mockUserService.findUnique.mockResolvedValue(Promise.resolve(mockUser));

      mockTwoFactorAuthenticationService.isTwoFactorAuthenticationCodeValid.mockReturnValueOnce(
        false,
      );

      const response = await request(app.getHttpServer())
        .post('/2fa/authenticate')
        .send({
          code: '1234',
        })
        .set('Authorization', `bearer ${accessToken}`);

      expect(response.status).toBe(401);
      expect(response.body).toEqual(
        JSON.parse(
          JSON.stringify({
            error: 'Unauthorized',
            message: 'Wrong authentication code',
            statusCode: 401,
          }),
        ),
      );
    });
    it('/2fa/authenticate with body should return 200 with good authorization code', async () => {
      const authenticationService = app.get<AuthenticationService>(
        AuthenticationService,
      );
      const accessToken = await authenticationService.createUserJWT(mockUser);

      mockUserService.findUnique.mockResolvedValue(Promise.resolve(mockUser));

      mockTwoFactorAuthenticationService.isTwoFactorAuthenticationCodeValid.mockReturnValueOnce(
        true,
      );

      const response = await request(app.getHttpServer())
        .post('/2fa/authenticate')
        .send({
          code: '1234',
        })
        .set('Authorization', `bearer ${accessToken}`);

      expect(response.status).toBe(401);
      expect(response.body).toEqual(
        JSON.parse(
          JSON.stringify({
            error: 'Unauthorized',
            message: 'Wrong authentication code',
            statusCode: 401,
          }),
        ),
      );
    });
  });
});
describe('Authentication Module with OTP mode not enabled', () => {
  let app: INestApplication;
  let mockUserService: MockProxy<AuthenticationUserService>;
  let mockAuthenticationOptions: MockProxy<AuthenticationOptions>;
  let mockTwoFactorAuthenticationService: MockProxy<TwoFactorAuthenticationService>;

  let mockUser: UserType;
  const mockFormatUser = jest.fn();

  beforeAll(async () => {
    mockUserService = mockDeep<AuthenticationUserService>();
    mockAuthenticationOptions = mockDeep<AuthenticationOptions>();
    mockTwoFactorAuthenticationService =
      mockDeep<TwoFactorAuthenticationService>();

    mockUser = {
      id: '1',
      email: 'test@email.com',
      password: 'password',
      otp: '123456',
    };

    const moduleFixture: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: TwoFactorAuthenticationService,
          useValue: mockTwoFactorAuthenticationService,
        },

        {
          provide: APP_GUARD,
          useClass: JwtGlobalAuthGuard,
        },
        {
          provide: AUTHENTICATION_MOCK_USER_SERVICE,
          useValue: mockUserService,
        },
        {
          provide: AUTHENTICATION_MODULE_OPTIONS,
          useValue: mockAuthenticationOptions,
        },
      ],
      imports: [
        AuthenticationModule.register({
          userConfig: {
            idField: 'id',
            emailField: 'email',
            loginField: 'email',
            passwordField: 'password',
            otpField: 'otp',
            formatUser: mockFormatUser,
          },
          jwtModuleOptions: {
            secret: 'integration-tests',
          },
          userService: AUTHENTICATION_MOCK_USER_SERVICE,
        }),
      ],
    }).compile();

    mockUserService.findUnique.mockReturnValue(Promise.resolve(mockUser));

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        transformOptions: {
          enableImplicitConversion: false,
          exposeDefaultValues: true,
        },
      }),
    );

    await app.init();
  });

  beforeEach(() => {
    mockFormatUser.mockImplementation((user) => user);
  });

  afterEach(async () => {
    mockFormatUser.mockReset();
    mockUserService.findUnique.mockReset();
    if (app) await app.close();
  });

  describe('Route without token in header', () => {
    it('/2fa/generate should return 401', async () => {
      await request(app.getHttpServer()).post('/2fa/generate').expect(401);
    });
    it('/2fa/authenticate should return 401', async () => {
      await request(app.getHttpServer()).post('/2fa/authenticate').expect(401);
    });
  });

  describe('Route with token set in header', () => {
    it('/2fa/generate should return 404', async () => {
      const authenticationService = app.get<AuthenticationService>(
        AuthenticationService,
      );
      const accessToken = await authenticationService.createUserJWT(mockUser);

      mockUserService.findUnique.mockResolvedValue(Promise.resolve(mockUser));

      const response = await request(app.getHttpServer())
        .post('/2fa/generate')
        .set('Authorization', `bearer ${accessToken}`);

      expect(response.status).toBe(404);
    });
    it('/2fa/authenticate without body should return 404', async () => {
      const authenticationService = app.get<AuthenticationService>(
        AuthenticationService,
      );
      const accessToken = await authenticationService.createUserJWT(mockUser);

      mockUserService.findUnique.mockResolvedValue(Promise.resolve(mockUser));

      const response = await request(app.getHttpServer())
        .post('/2fa/authenticate')
        .send({
          code: '1234',
        })
        .set('Authorization', `bearer ${accessToken}`);

      expect(response.status).toBe(404);
    });
  });
});
