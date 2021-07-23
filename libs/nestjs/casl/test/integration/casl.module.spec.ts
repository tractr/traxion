import { INestApplication } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { Test, TestingModule } from '@nestjs/testing';
import { mockDeep, MockProxy } from 'jest-mock-extended';
import * as request from 'supertest';

import { CaslModule, PoliciesGuard } from '../../src';
import {
  CaslEndPointMock,
  rolePermissions,
} from '../mock/casl-endpoint-mock.controller';
import { mockAuthenticationGuard } from '../mock/mock-authentication-guard';

import { LoggerModule } from '@tractr/nestjs-core';

describe('Authentication Module (integration)', () => {
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
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();

    await app.init();
  });

  afterAll(async () => {
    await app.close();
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

      mockUser.getUser.mockReturnValue(null);
      mockUser.isPublic.mockReturnValueOnce(true);

      await request(app.getHttpServer()).get('/read-guest').expect(200);
    });
  });
});
