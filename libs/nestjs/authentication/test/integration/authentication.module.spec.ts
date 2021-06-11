import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { mockDeep, MockProxy } from 'jest-mock-extended';
import * as request from 'supertest';

import { DatabaseService } from '../../../database/src';
import { PRISMA_MODULE_OPTIONS } from '../../../database/src/constants';
import { AuthenticationModule } from '../../src';
import { AUTHENTICATION_OPTIONS } from '../../src/config';
import { AuthenticationEndpointMockController } from '../mock/authentication-endpoint-mock.controller';

import {
  USER_DATABASE_SERVICE,
  USER_SERVICE,
  UserDatabaseService,
  UserService,
} from '@generated/nestjs-models-common';
import { mockUserServiceFactory } from '@generated/nestjs-models-common/mock';

describe('Authentication Module (integration)', () => {
  let app: INestApplication;
  let mockUserService: MockProxy<UserService>;
  let mockUserDatabaseService: MockProxy<UserDatabaseService>;
  let mockDatabaseService: MockProxy<DatabaseService>;

  beforeAll(async () => {
    mockUserService = mockUserServiceFactory();
    mockUserDatabaseService = mockDeep<UserDatabaseService>();

    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [AuthenticationEndpointMockController],
      providers: [
        {
          provide: DatabaseService,
          useValue: mockDatabaseService,
        },
        {
          provide: PRISMA_MODULE_OPTIONS,
          useValue: {},
        },
      ],
      imports: [
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
            {
              provide: PRISMA_MODULE_OPTIONS,
              useValue: {},
            },
          ],
        }),
        // DatabaseModule.register(),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Authentication route', () => {
    it('/not-authenticated', async () => {
      await request(app.getHttpServer()).get('/not-authenticated').expect(401);
    });
  });
});
