import { INestApplication } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { Test, TestingModule } from '@nestjs/testing';
import { mockDeep, MockProxy } from 'jest-mock-extended';

import { AuthenticationEndpointMockController } from '../mocks';

import {
  AUTHENTICATION_MODULE_OPTIONS,
  AuthenticationModule,
  AuthenticationOptions,
  AuthenticationOptionsPassword,
  AuthenticationOptionsPasswordReset,
  AuthenticationUserService,
  JwtGlobalAuthGuard,
} from '.';

import { getDefaults } from '@tractr/common';
import { LoggerModule } from '@tractr/nestjs-core';

const AUTHENTICATION_MOCK_USER_SERVICE = 'AUTHENTICATION_MOCK_USER_SERVICE';

describe('Authentication Module with async options', () => {
  let app: INestApplication;
  let mockUserService: MockProxy<AuthenticationUserService>;
  const mockUserConfig = {
    emailField: 'email',
    passwordField: 'password',
    loginField: 'email',
    idField: 'id',
    customSelect: undefined,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    formatUser: (user: Record<string, any>) => user,
  };

  beforeEach(async () => {
    mockUserService = mockDeep<AuthenticationUserService>();

    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [AuthenticationEndpointMockController],
      providers: [
        {
          provide: APP_GUARD,
          useClass: JwtGlobalAuthGuard,
        },
        {
          provide: AUTHENTICATION_MOCK_USER_SERVICE,
          useValue: mockUserService,
        },
      ],
      imports: [
        LoggerModule,
        AuthenticationModule.registerAsync({
          useFactory: (defaultValue) =>
            Promise.resolve({
              ...defaultValue,
              userConfig: mockUserConfig,
              jwtModuleOptions: {
                secret: 'integration-tests',
              },
              userService: AUTHENTICATION_MOCK_USER_SERVICE,
            }),
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
  });

  afterEach(async () => {
    if (app) await app.close();
  });

  it('should load the authentication options async', async () => {
    const authenticationOptions = app.get<AuthenticationOptions>(
      AUTHENTICATION_MODULE_OPTIONS,
    );

    expect(authenticationOptions).toEqual({
      cookies: {
        cookieName: 'authCookie',
        options: {
          httpOnly: true,
          secure: false,
          maxAge: 86400000,
        },
        queryParamName: 'authToken',
      },
      jwtModuleOptions: {
        secret: 'integration-tests',
      },
      passportModuleOptions: {
        defaultStrategy: 'jwt',
      },
      password: {
        reset: {
          active: false,
          link: '/password/reset/{{id}}/{{code}}',
          subject: 'Lost password',
        },
        saltRounds: 10,
      },
      strategy: {
        jwt: {
          ignoreExpiration: false,
          jwtFromRequest: expect.any(Function),
        },
        local: {
          passReqToCallback: true,
        },
      },
      userConfig: mockUserConfig,
      userService: AUTHENTICATION_MOCK_USER_SERVICE,
    });
  });
});

describe('Authentication Module with reset password', () => {
  let app: INestApplication;
  let mockUserService: MockProxy<AuthenticationUserService>;

  afterEach(async () => {
    if (app) await app.close();
  });

  it('should fail if the mailer is not configure when we ask the reset password feature', async () => {
    await expect(async () => {
      mockUserService = mockDeep<AuthenticationUserService>();

      const moduleFixture: TestingModule = await Test.createTestingModule({
        controllers: [AuthenticationEndpointMockController],
        providers: [
          {
            provide: APP_GUARD,
            useClass: JwtGlobalAuthGuard,
          },
          {
            provide: AUTHENTICATION_MOCK_USER_SERVICE,
            useValue: mockUserService,
          },
        ],
        imports: [
          LoggerModule,
          AuthenticationModule.register({
            jwtModuleOptions: {
              secret: 'integration-tests',
            },
            userService: AUTHENTICATION_MOCK_USER_SERVICE,
            password: {
              ...getDefaults(AuthenticationOptionsPassword),
              reset: {
                ...getDefaults(AuthenticationOptionsPasswordReset),
                active: true,
              },
            },
          }),
        ],
      }).compile();

      app = moduleFixture.createNestApplication();
    }).rejects.toThrowError(
      'password reset is activated. You must configure the mailer module options',
    );
  });

  it('should not fail if the mailer is configure when we ask the reset password feature', async () => {
    mockUserService = mockDeep<AuthenticationUserService>();

    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [AuthenticationEndpointMockController],
      providers: [
        {
          provide: APP_GUARD,
          useClass: JwtGlobalAuthGuard,
        },
        {
          provide: AUTHENTICATION_MOCK_USER_SERVICE,
          useValue: mockUserService,
        },
      ],
      imports: [
        LoggerModule,
        AuthenticationModule.register({
          jwtModuleOptions: {
            secret: 'integration-tests',
          },
          userService: AUTHENTICATION_MOCK_USER_SERVICE,
          password: {
            ...getDefaults(AuthenticationOptionsPassword),
            reset: {
              ...getDefaults(AuthenticationOptionsPasswordReset),
              active: true,
            },
          },
          mailer: {
            from: 'test@test.com',
            name: 'test',
            moduleOptions: {
              publicApiKey: 'publicApiKey',
              privateApiKey: 'privateApiKey',
            },
          },
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
  });
});
