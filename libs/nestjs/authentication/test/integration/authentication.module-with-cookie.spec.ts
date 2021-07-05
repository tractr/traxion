import { INestApplication } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { Test, TestingModule } from '@nestjs/testing';
import * as cookieParser from 'cookie-parser';
import { mockDeep, MockProxy } from 'jest-mock-extended';
import * as request from 'supertest';

import { mockUserFactory } from '../../generated/models/mock';
import {
  USER_DATABASE_SERVICE,
  USER_SERVICE,
  UserDatabaseService,
  UserService,
} from '../../generated/nestjs-models-common';
import { mockUserServiceFactory } from '../../generated/nestjs-models-common/mock';
import {
  AuthenticationModule,
  AuthenticationService,
  JwtGlobalAuthGuard,
} from '../../src';
import { AUTHENTICATION_OPTIONS } from '../../src/config';
import { AuthenticationEndpointMockController } from '../mock/authentication-endpoint-mock.controller';

import { LoggerModule } from '@tractr/nestjs-core';

describe('Authentication Module (integration)', () => {
  let app: INestApplication;
  let mockUserService: MockProxy<UserService>;
  let mockUserDatabaseService: MockProxy<UserDatabaseService>;

  beforeEach(async () => {
    mockUserService = mockUserServiceFactory();
    mockUserDatabaseService = mockDeep<UserDatabaseService>();

    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [AuthenticationEndpointMockController],
      providers: [
        {
          provide: APP_GUARD,
          useClass: JwtGlobalAuthGuard,
        },
      ],
      imports: [
        LoggerModule,
        AuthenticationModule.register({
          ...AUTHENTICATION_OPTIONS,
          jwtModuleOptions: {
            ...AUTHENTICATION_OPTIONS.jwtModuleOptions,
            secret: 'integration-tests',
          },
          providers: [
            { provide: USER_SERVICE, useValue: mockUserService },
            {
              provide: USER_DATABASE_SERVICE,
              useValue: mockUserDatabaseService as unknown,
            },
          ],
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
  });

  afterEach(async () => {
    await app.close();
  });

  describe('Authentication route', () => {
    it('/me get the user information back and use the cookie auth strategy', async () => {
      app.use(cookieParser('test'));
      await app.init();

      const authenticationService = app.get<AuthenticationService>(
        AuthenticationService,
      );

      const mockUser = mockUserFactory();
      const hashPassword = await authenticationService.hashPassword(
        mockUser.password,
      );

      mockUserService.findUnique.mockResolvedValue({
        ...mockUser,
        password: hashPassword,
      } as never);

      const responseWithCookie = await request(app.getHttpServer())
        .post('/login')
        .send({ email: mockUser.email, password: mockUser.password });

      mockUserService.findUnique.mockResolvedValue(mockUser as never);

      const response = await request(app.getHttpServer())
        .get('/me')
        .set('Cookie', responseWithCookie.header['set-cookie']);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(JSON.parse(JSON.stringify(mockUser)));
    });

    it('/me get 401 if cookieParser is not add to the app module', async () => {
      await app.init();

      const authenticationService = app.get<AuthenticationService>(
        AuthenticationService,
      );

      const mockUser = mockUserFactory();
      const hashPassword = await authenticationService.hashPassword(
        mockUser.password,
      );

      mockUserService.findUnique.mockResolvedValue({
        ...mockUser,
        password: hashPassword,
      } as never);

      const responseWithCookie = await request(app.getHttpServer())
        .post('/login')
        .send({ email: mockUser.email, password: mockUser.password });

      mockUserService.findUnique.mockResolvedValue(mockUser as never);

      await request(app.getHttpServer())
        .get('/me')
        .set('Cookie', responseWithCookie.header['set-cookie'])
        .expect(401);
    });
  });
});
