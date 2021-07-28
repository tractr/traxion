import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { mockDeep, MockProxy } from 'jest-mock-extended';
import * as request from 'supertest';

import {
  USER_DATABASE_SERVICE,
  USER_SERVICE,
  UserDatabaseService,
  UserService,
} from '../../generated/nestjs-models-common';
import { mockUserServiceFactory } from '../../generated/nestjs-models-common/mock';
import { AuthenticationModule } from '../../src';
import { AUTHENTICATION_OPTIONS } from '../../src/config';
import { AuthenticationEndpointMockController } from '../mock/authentication-endpoint-mock.controller';

import { LoggerModule } from '@tractr/nestjs-core';
import { DatabaseService } from '@tractr/nestjs-database';

describe('Authentication Module (integration)', () => {
  let app: INestApplication;
  let mockUserService: MockProxy<UserService>;
  let mockUserDatabaseService: MockProxy<UserDatabaseService>;

  beforeEach(async () => {
    mockUserService = mockUserServiceFactory();
    mockUserDatabaseService = mockDeep<UserDatabaseService>();

    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [AuthenticationEndpointMockController],
      providers: [],
      imports: [
        LoggerModule,
        AuthenticationModule.register({
          ...AUTHENTICATION_OPTIONS,
          jwtModuleOptions: {
            ...AUTHENTICATION_OPTIONS.jwtModuleOptions,
            secret: 'integration-tests',
          },
          providers: [
            {
              provide: DatabaseService,
              useValue: mockDeep<DatabaseService>(),
            },
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

  describe('Authentication without registering a global auth guard', () => {
    function expectBodyMessage(res: request.Response) {
      expect(res.body.message).toBe(
        'It seems like you are using @tractr/nestjs-authentication without adding a global APP_GUARD. Try to add the provider.',
      );
    }

    it('/is-public', async () => {
      await request(app.getHttpServer()).get('/is-public').expect(200);
    });

    it('/is-private should not fail', async () => {
      await request(app.getHttpServer()).get('/is-private').expect(200);
    });

    it('/login should fail with 401', async () => {
      await request(app.getHttpServer()).post('/login').expect(401);
    });

    it('/logout should fail with 501', async () => {
      await request(app.getHttpServer())
        .get('/logout')
        .expect(501)
        .expect(expectBodyMessage);
      await request(app.getHttpServer())
        .post('/logout')
        .expect(501)
        .expect(expectBodyMessage);
    });

    it('/me should fail with 501', async () => {
      await request(app.getHttpServer())
        .get('/me')
        .expect(501)
        .expect(expectBodyMessage);
    });
  });
});
