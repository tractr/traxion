import { INestApplication } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { Test, TestingModule } from '@nestjs/testing';
import { mockDeep, MockProxy } from 'jest-mock-extended';
import * as request from 'supertest';

import { CaslModule } from './casl.module';
import { MODULE_OPTIONS_TOKEN } from './casl.module-definition';
import { PoliciesGuard } from './guards';
import { UntypedCaslModuleOptions } from './interfaces';
import { CaslEndPointMock } from '../mocks/casl-endpoint-mock.controller';
import { mockAuthenticationGuard } from '../mocks/mock-authentication-guard';
import {
  publicPermissions,
  rolePermissions,
} from '../mocks/role-permission.mock';

import { LoggerModule } from '@trxn/nestjs-core';

describe('Authentication Module', () => {
  let app: INestApplication;
  let mockUser: MockProxy<{
    getUser: () => Record<string, unknown> | null;
    isPublic: () => boolean;
  }>;

  beforeAll(async () => {
    mockUser = mockDeep<{
      getUser: () => Record<string, unknown> | null;
      isPublic: () => boolean;
    }>();

    mockUser.isPublic.mockReturnValue(false);

    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [CaslEndPointMock],
      providers: [
        {
          provide: APP_GUARD,
          useClass: mockAuthenticationGuard(mockUser),
        },
        {
          provide: APP_GUARD,
          useClass: PoliciesGuard,
        },
      ],
      imports: [
        LoggerModule,
        CaslModule.register({
          rolePermissions,
          getRoles: (user) => user.roles,
          publicPermissions,
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();

    await app.init();
    app.useLogger(false);
  });

  afterAll(async () => {
    await app?.close();
  });

  describe('Casl route', () => {
    it('/read-user user:admin', async () => {
      mockUser.getUser.mockReturnValue({
        id: 'test',
        roles: ['admin'],
      });
      await request(app.getHttpServer()).get('/read-user').expect(200);
    });
    it('/read-user user:user', async () => {
      mockUser.getUser.mockReturnValue({
        id: 'test',
        roles: ['user'],
      });
      await request(app.getHttpServer()).get('/read-user').expect(200);
    });
    it('/read-user user:guest', async () => {
      mockUser.getUser.mockReturnValue({
        id: 'test',
        roles: ['guest'],
      });
      await request(app.getHttpServer()).get('/read-user').expect(403);
    });
    it('/read-user no-user', async () => {
      mockUser.getUser.mockReturnValue(null);
      mockUser.isPublic.mockReturnValueOnce(true);

      await request(app.getHttpServer()).get('/read-user').expect(403);
    });
    it('/read-admin user:admin', async () => {
      mockUser.getUser.mockReturnValue({
        id: 'test',
        roles: ['admin'],
      });
      await request(app.getHttpServer()).get('/read-admin').expect(200);
    });
    it('/read-admin user:user', async () => {
      mockUser.getUser.mockReturnValue({
        id: 'test',
        roles: ['user'],
      });
      await request(app.getHttpServer()).get('/read-admin').expect(403);
    });
    it('/read-admin user:guest', async () => {
      mockUser.getUser.mockReturnValue({
        id: 'test',
        roles: ['guest'],
      });
      await request(app.getHttpServer()).get('/read-admin').expect(403);
    });
    it('/read-admin no-user', async () => {
      mockUser.getUser.mockReturnValue(null);
      mockUser.isPublic.mockReturnValueOnce(true);

      await request(app.getHttpServer()).get('/read-admin').expect(403);
    });
    it('/read-guest user:admin', async () => {
      mockUser.getUser.mockReturnValue({
        id: 'test',
        roles: ['admin'],
      });
      await request(app.getHttpServer()).get('/read-guest').expect(200);
    });
    it('/read-guest user:user', async () => {
      mockUser.getUser.mockReturnValue({
        id: 'test',
        roles: ['user'],
      });
      await request(app.getHttpServer()).get('/read-guest').expect(403);
    });
    it('/read-guest user:guest', async () => {
      mockUser.getUser.mockReturnValue({
        id: 'test',
        roles: ['guest'],
      });
      await request(app.getHttpServer()).get('/read-guest').expect(200);
    });
    it('/read-guest no-user', async () => {
      mockUser.getUser.mockReturnValue(null);
      mockUser.isPublic.mockReturnValueOnce(true);

      await request(app.getHttpServer()).get('/read-guest').expect(200);
    });
    it('should fail if the user has no roles', async () => {
      mockUser.getUser.mockReturnValue({
        id: 'test',
      });
      await request(app.getHttpServer()).get('/read-user').expect(403);
    });
    it('should work with a policyHandler as a class with dependency injection', async () => {
      mockUser.getUser.mockReturnValue({
        id: 'test',
        roles: ['admin'],
      });
      await request(app.getHttpServer())
        .get('/with-policy-handler-as-class')
        .expect(200);
    });
    it('should not work with wring policy handler', async () => {
      mockUser.getUser.mockReturnValue({
        id: 'test',
        roles: ['admin'],
      });
      await request(app.getHttpServer())
        .get('/with-wrong-policy-handler')
        .expect(500);
    });
    it('should work with no policy handler', async () => {
      mockUser.getUser.mockReturnValue({
        id: 'test',
        roles: ['admin'],
      });
      await request(app.getHttpServer())
        .get('/with-no-policy-handler')
        .expect(200);
    });
    it('should work with public decorator', async () => {
      mockUser.getUser.mockReturnValue({
        id: 'test',
        roles: ['admin'],
      });
      await request(app.getHttpServer()).get('/with-public').expect(200);
    });
  });

  describe('registerAsync', () => {
    it('should accept registerAsyncParams', async () => {
      const moduleFixture: TestingModule = await Test.createTestingModule({
        controllers: [CaslEndPointMock],
        providers: [
          {
            provide: APP_GUARD,
            useClass: mockAuthenticationGuard(mockUser),
          },
          {
            provide: APP_GUARD,
            useClass: PoliciesGuard,
          },
        ],
        imports: [
          LoggerModule,
          CaslModule.registerAsync({
            useFactory: () => ({
              rolePermissions,
              getRoles: (user) => user.roles,
              publicPermissions,
            }),
          }),
        ],
      }).compile();

      const caslModuleOptions =
        moduleFixture.get<UntypedCaslModuleOptions>(MODULE_OPTIONS_TOKEN);

      expect(caslModuleOptions.rolePermissions).toEqual(rolePermissions);
    });
  });
});
