import { INestApplication } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { Test, TestingModule } from '@nestjs/testing';
import { mockDeep, MockProxy } from 'jest-mock-extended';

import { AuthenticationEndpointMockController } from '../mocks';

import {
  AUTHENTICATION_MODULE_OPTIONS,
  AuthenticationModule,
  AuthenticationOptions,
  AuthenticationUserService,
  JwtGlobalAuthGuard,
} from '.';

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
