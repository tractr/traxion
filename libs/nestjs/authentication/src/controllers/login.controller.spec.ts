import { INestApplication } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { Test, TestingModule } from '@nestjs/testing';
import * as cookieParser from 'cookie-parser';
import { mockDeep, MockProxy } from 'jest-mock-extended';
import * as request from 'supertest';

import { AuthenticationEndpointMockController } from '../../mocks';
import { AuthenticationModule } from '../authentication.module';
import { AUTHENTICATION_DEFAULT_QUERY_PARAM_NAME } from '../constants';
import { JwtGlobalAuthGuard } from '../guards';
import { UserType } from '../interfaces';
import { AuthenticationService, AuthenticationUserService } from '../services';

import { LoggerModule } from '@tractr/nestjs-core';

const AUTHENTICATION_MOCK_USER_SERVICE = 'AUTHENTICATION_MOCK_USER_SERVICE';

describe('Authentication Module', () => {
  let app: INestApplication;
  let mockUserService: MockProxy<AuthenticationUserService>;
  let mockUser: UserType;
  const mockFormatUser = jest.fn();

  beforeAll(async () => {
    mockUserService = mockDeep<AuthenticationUserService>();

    mockUser = {
      id: '1',
      email: 'test@email.com',
      password: 'password',
    };

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
          userConfig: {
            idField: 'id',
            emailField: 'email',
            loginField: 'email',
            passwordField: 'password',
            formatUser: mockFormatUser,
          },
          jwtModuleOptions: {
            secret: 'integration-tests',
          },
          userService: AUTHENTICATION_MOCK_USER_SERVICE,
        }),
      ],
    }).compile();

    mockUserService.findUnique.mockReturnValue(Promise.resolve(mockUser));

    app = moduleFixture.createNestApplication();

    await app.init();
  });

  beforeEach(() => {
    mockFormatUser.mockImplementation((user) => user);
  });

  afterEach(async () => {
    mockFormatUser.mockReset();
    mockUserService.findUnique.mockReset();
    // mockFormatUser.mockReset();
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

      const { password, ...expectedUser } = mockUser;

      const hashPassword = await authenticationService.hashPassword(
        (password as string) || '',
      );

      mockUserService.findUnique.mockResolvedValueOnce(
        Promise.resolve({
          ...expectedUser,
        }),
      );
      mockUserService.findUnique.mockResolvedValueOnce(
        Promise.resolve({
          password: hashPassword,
        }),
      );

      const response = await request(app.getHttpServer())
        .post('/login')
        .send({ email: mockUser.email, password });

      expect(response.status).toBe(200);

      expect(response.body).toEqual({
        accessToken: await authenticationService.createUserJWT(mockUser),
        user: expectedUser,
      });

      expect(mockFormatUser).toHaveBeenCalledTimes(1);
      expect(mockFormatUser).toBeCalledWith(expectedUser);
    });
    it('/me get the user information back and use the jwt auth strategy', async () => {
      const authenticationService = app.get<AuthenticationService>(
        AuthenticationService,
      );
      const accessToken = await authenticationService.createUserJWT(mockUser);

      mockUserService.findUnique.mockResolvedValue(Promise.resolve(mockUser));

      const response = await request(app.getHttpServer())
        .get('/me')
        .set('Authorization', `bearer ${accessToken}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(JSON.parse(JSON.stringify(mockUser)));

      expect(mockFormatUser).toHaveBeenCalledTimes(1);
      expect(mockFormatUser).toBeCalledWith(mockUser);
    });
    it('/me get the user information back and use the query param auth strategy', async () => {
      const authenticationService = app.get<AuthenticationService>(
        AuthenticationService,
      );
      const accessToken = await authenticationService.createUserJWT(mockUser);

      mockUserService.findUnique.mockResolvedValue(mockUser as never);

      const response = await request(app.getHttpServer()).get(
        `/me?${AUTHENTICATION_DEFAULT_QUERY_PARAM_NAME}=${accessToken}`,
      );

      expect(response.status).toBe(200);
      expect(response.body).toEqual(JSON.parse(JSON.stringify(mockUser)));

      expect(mockFormatUser).toHaveBeenCalledTimes(1);
      expect(mockFormatUser).toBeCalledWith(mockUser);
    });

    it('/logout should set the cookie to undefined to logout the browser', async () => {
      const authenticationService = app.get<AuthenticationService>(
        AuthenticationService,
      );
      const accessToken = await authenticationService.createUserJWT(mockUser);

      mockUserService.findUnique.mockResolvedValue(mockUser as never);

      const response = await request(app.getHttpServer())
        .get('/logout')
        .set('Authorization', `bearer ${accessToken}`);

      expect(response.status).toBe(200);
      expect(response.headers['set-cookie']).toEqual([
        'authCookie=; Path=/; HttpOnly',
      ]);
    });
  });
});

describe('Authentication Module without guards', () => {
  let app: INestApplication;
  let mockUserService: MockProxy<AuthenticationUserService>;

  beforeEach(async () => {
    mockUserService = mockDeep<AuthenticationUserService>();

    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [AuthenticationEndpointMockController],
      providers: [
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

describe('Authentication Module with cookie', () => {
  let app: INestApplication;
  let mockUserService: MockProxy<AuthenticationUserService>;
  let mockUser: UserType;

  beforeEach(async () => {
    mockUserService = mockDeep<AuthenticationUserService>();

    mockUser = {
      id: '1',
      email: 'test@email.com',
      password: 'password',
    };

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
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
  });

  afterEach(async () => {
    if (app) await app.close();
  });

  describe('Authentication route', () => {
    it('/me get the user information back and use the cookie auth strategy', async () => {
      app.use(cookieParser('test'));
      await app.init();

      const authenticationService = app.get<AuthenticationService>(
        AuthenticationService,
      );

      const hashPassword = await authenticationService.hashPassword(
        (mockUser.password as string) || '',
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
        .set('Cookie', responseWithCookie.header['set-cookie'] as string);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(JSON.parse(JSON.stringify(mockUser)));
    });

    it('/me get 401 if cookieParser is not add to the app module', async () => {
      await app.init();

      const authenticationService = app.get<AuthenticationService>(
        AuthenticationService,
      );

      const hashPassword = await authenticationService.hashPassword(
        (mockUser.password as string) || '',
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
        .set('Cookie', responseWithCookie.header['set-cookie'] as string)
        .expect(401);
    });
  });
});
