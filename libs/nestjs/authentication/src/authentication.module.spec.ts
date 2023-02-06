import { INestApplication } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { Test, TestingModule } from '@nestjs/testing';
import { Prisma } from '@prisma/client';
import { mockDeep, MockProxy } from 'jest-mock-extended';
import * as jwt from 'jsonwebtoken';
import * as request from 'supertest';

import { AuthenticationEndpointMockController } from '../mocks';
import { AuthenticationModule } from './authentication.module';
import { JwtGlobalAuthGuard } from './guards';
import { AuthenticationService } from './services';
import { JwtStrategy, LocalStrategy } from './strategies';

describe('Authentication Module', () => {
  let app: INestApplication;
  let mockUserService: MockProxy<Prisma.UserDelegate<false>>;

  it('should load the module when using register', async () => {
    mockUserService = mockDeep<Prisma.UserDelegate<false>>();
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AuthenticationModule.register({
          userService: mockUserService,
          jwtModuleOptions: {
            secret: 'integration-tests',
          },
        }),
      ],
      providers: [],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    const authenticationService = app.get(AuthenticationService);
    expect(authenticationService).toBeInstanceOf(AuthenticationService);
    const jwtStrategy = app.get(JwtStrategy);
    expect(jwtStrategy).toBeInstanceOf(JwtStrategy);
    const localStrategy = app.get(LocalStrategy);
    expect(localStrategy).toBeInstanceOf(LocalStrategy);
  });

  it('should load the module when using registerAsync', async () => {
    mockUserService = mockDeep<Prisma.UserDelegate<false>>();
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AuthenticationModule.register({
          userService: mockUserService,
          jwtModuleOptions: {
            secret: 'integration-tests',
          },
        }),
      ],
      providers: [],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    const authenticationService = app.get(AuthenticationService);
    expect(authenticationService).toBeInstanceOf(AuthenticationService);
    const jwtStrategy = app.get(JwtStrategy);
    expect(jwtStrategy).toBeInstanceOf(JwtStrategy);
    const localStrategy = app.get(LocalStrategy);
    expect(localStrategy).toBeInstanceOf(LocalStrategy);
  });

  describe('Authentication module when using jwt global guard', () => {
    beforeEach(async () => {
      mockUserService = mockDeep<Prisma.UserDelegate<false>>();

      const moduleFixture: TestingModule = await Test.createTestingModule({
        controllers: [AuthenticationEndpointMockController],
        imports: [
          AuthenticationModule.register({
            userService: mockUserService,
            jwtModuleOptions: {
              secret: 'integration-tests',
            },
          }),
        ],
        providers: [
          {
            provide: APP_GUARD,
            useClass: JwtGlobalAuthGuard,
          },
        ],
      }).compile();

      app = moduleFixture.createNestApplication();
      await app.init();
    });

    it('/is-public', async () => {
      await request(app.getHttpServer()).get('/is-public').expect(200);
    });
    it('/is-public-with-user', async () => {
      const res = await request(app.getHttpServer())
        .get('/is-public-with-user')
        .expect(200);

      expect(res.body).toEqual({});
    });
    it('/is-private', async () => {
      await request(app.getHttpServer()).get('/is-private').expect(401);
    });
    it('/is-public-with-user should have a user if connected', async () => {
      const jwtToken = jwt.sign({ sub: '1' }, 'login-controller-secret');

      const res = await request(app.getHttpServer())
        .get('/is-public-with-user')
        .set('Authorization', `bearer ${jwtToken}`)
        .expect(200);

      expect(res.body).toEqual({});
    });
  });

  describe('Authentication Module without global guards', () => {
    beforeEach(async () => {
      mockUserService = mockDeep<Prisma.UserDelegate<false>>();
      const moduleFixture: TestingModule = await Test.createTestingModule({
        controllers: [AuthenticationEndpointMockController],
        imports: [
          AuthenticationModule.register({
            userService: mockUserService,
            jwtModuleOptions: {
              secret: 'integration-tests',
            },
          }),
        ],
      }).compile();

      app = moduleFixture.createNestApplication();
      await app.init();

      app = moduleFixture.createNestApplication();

      await app.init();
    });

    afterEach(async () => {
      if (app) await app.close();
    });

    it('/is-public', async () => {
      await request(app.getHttpServer()).get('/is-public').expect(200);
    });

    it('/is-private should not fail', async () => {
      await request(app.getHttpServer()).get('/is-private').expect(200);
    });

    it('/login should fail with 401', async () => {
      await request(app.getHttpServer()).post('/login').expect(401);
    });

    it('/logout should not fail', async () => {
      await request(app.getHttpServer()).post('/logout').expect(200);
    });

    it('/me should fail with 401 and reset cookie', async () => {
      const response = await request(app.getHttpServer())
        .get('/me')
        .expect(401);

      const cookie = response.headers['set-cookie'][0];

      expect(cookie).toMatch(/authCookie=/);
      expect(cookie).toMatch(/Path=\//);
    });
  });
});
