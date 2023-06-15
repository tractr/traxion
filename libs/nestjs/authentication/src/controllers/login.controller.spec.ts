import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { mockDeep, MockProxy } from 'jest-mock-extended';
import * as jwt from 'jsonwebtoken';
import * as request from 'supertest';

import { LoginController } from './login.controller';
import { MODULE_OPTIONS_TOKEN } from '../authentication.module-definition';
import {
  AuthenticationService,
  CookieOptionsService,
  StrategyOptionsService,
} from '../services';
import { JwtOptionsService } from '../services/jwt-options.service';
import { JwtStrategy, LocalStrategy } from '../strategies';

import { UserService } from '@trxn/nestjs-user';

type User = {
  id: string;
  email: string;
  password: string;
};

describe('Login Controller', () => {
  let app: INestApplication;
  let mockUserService: MockProxy<UserService>;
  let mockAuthenticationService: MockProxy<AuthenticationService>;
  let mockUser: User;

  beforeAll(async () => {
    mockAuthenticationService = mockDeep<AuthenticationService>();
    mockUserService = mockDeep<UserService>();

    mockUser = {
      id: '1',
      email: 'test@email.com',
      password: 'password',
    } as User;

    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [LoginController],
      providers: [
        {
          provide: UserService,
          useValue: mockUserService,
        },
        {
          provide: AuthenticationService,
          useValue: mockAuthenticationService,
        },
        {
          provide: MODULE_OPTIONS_TOKEN,
          useValue: {
            jwtModuleOptions: {
              secret: 'login-controller-secret',
            },
          },
        },
        LocalStrategy,
        JwtStrategy,
        StrategyOptionsService,
        CookieOptionsService,
        JwtOptionsService,
      ],
      imports: [],
    }).compile();

    app = moduleFixture.createNestApplication();

    await app.init();
  });

  afterEach(async () => {
    if (app) await app.close();
  });

  describe('POST /login', () => {
    it('should fail if no user info is passed', async () => {
      await request(app.getHttpServer()).post('/login').expect(401);
    });

    it('should authenticate if user login info is passed and validated', async () => {
      const { password, ...expectedUser } = mockUser;

      mockAuthenticationService.validateUser.mockResolvedValueOnce(
        expectedUser as User,
      );

      mockAuthenticationService.login.mockResolvedValueOnce({
        accessToken: 'token',
      });

      const response = await request(app.getHttpServer())
        .post('/login')
        .send({ email: mockUser.email, password })
        .expect(200);

      expect(response.body).toEqual({
        accessToken: 'token',
      });
    });
  });

  describe('GET /me', () => {
    it('/me get the user information back and use the jwt auth strategy', async () => {
      const jwtToken = jwt.sign({ sub: '1' }, 'login-controller-secret');
      mockUserService.findUserById.mockResolvedValue(mockUser);

      const response = await request(app.getHttpServer())
        .get('/me')
        .set('Authorization', `bearer ${jwtToken}`)
        .expect(200);

      expect(response.body).toEqual(mockUser);
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(mockUserService.findUserById).toHaveBeenCalledTimes(1);
    });
  });

  describe('POST /logout', () => {
    it('should set the cookie to undefined to logout the browser', async () => {
      const response = await request(app.getHttpServer())
        .post('/logout')
        .expect(200);
      const cookie = response.headers['set-cookie'][0];

      expect(cookie).toMatch(/authCookie=/);
      expect(cookie).toMatch(/Path=\//);
      expect(cookie).toMatch(/Max-Age=86400/);
      expect(cookie).toMatch(/Expires=/);
      expect(cookie).toMatch(/HttpOnly/);
    });
  });
});
