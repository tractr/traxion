import { INestApplication } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { Test, TestingModule } from '@nestjs/testing';
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
import {
  AUTHENTICATION_OPTIONS,
  AUTHENTICATION_QUERY_PARAM_NAME,
} from '../../src/config';
import { AuthenticationEndpointMockController } from '../mock/authentication-endpoint-mock.controller';

import { LoggerModule } from '@tractr/nestjs-core';

describe('Authentication Module (integration)', () => {
  let app: INestApplication;
  let mockUserService: MockProxy<UserService>;
  let mockUserDatabaseService: MockProxy<UserDatabaseService>;

  beforeAll(async () => {
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
          api: {
            url: 'not tested yet',
          },
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();

    await app.init();
  });

  afterEach(async () => {
    if (app) await app.close();
  });

  describe('Authentication route', () => {
    it('/is-public', async () => {
      await request(app.getHttpServer()).get('/is-public').expect(200);
    });
    it('/is-private', async () => {
      await request(app.getHttpServer()).get('/is-private').expect(401);
    });
    it('/login should fail if no user info is passed', async () => {
      await request(app.getHttpServer()).post('/login').expect(401);
    });
    it('/login should authenticate if user login info is passed', async () => {
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

      const response = await request(app.getHttpServer())
        .post('/login')
        .send({ email: mockUser.email, password: mockUser.password });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        accessToken: await authenticationService.createUserJWT(mockUser),
        user: {
          ...mockUser,
          password: expect.any(String),
        },
      });
    });
    it('/me get the user information back and use the jwt auth strategy', async () => {
      const authenticationService = app.get<AuthenticationService>(
        AuthenticationService,
      );
      const mockUser = mockUserFactory();
      const accessToken = await authenticationService.createUserJWT(mockUser);

      mockUserService.findUnique.mockResolvedValue(mockUser as never);

      const response = await request(app.getHttpServer())
        .get('/me')
        .set('Authorization', `bearer ${accessToken}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(JSON.parse(JSON.stringify(mockUser)));
    });
    it('/me get the user information back and use the query param auth strategy', async () => {
      const authenticationService = app.get<AuthenticationService>(
        AuthenticationService,
      );
      const mockUser = mockUserFactory();
      const accessToken = await authenticationService.createUserJWT(mockUser);

      mockUserService.findUnique.mockResolvedValue(mockUser as never);

      const response = await request(app.getHttpServer()).get(
        `/me?${AUTHENTICATION_QUERY_PARAM_NAME}=${accessToken}`,
      );

      expect(response.status).toBe(200);
      expect(response.body).toEqual(JSON.parse(JSON.stringify(mockUser)));
    });
  });
});
