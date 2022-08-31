import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { mockDeep, MockProxy } from 'jest-mock-extended';
import * as request from 'supertest';

import { BadResetCodeError } from '../errors';
import { ResetPasswordService } from '../services';
import { ResetPasswordController } from './reset-password.controller';

import { UserNotFoundError } from '@tractr/nestjs-authentication';

describe('ResetPassword Controller', () => {
  let app: INestApplication;
  let mockResetPasswordService: MockProxy<ResetPasswordService>;

  beforeAll(async () => {
    mockResetPasswordService = mockDeep<ResetPasswordService>();

    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [ResetPasswordController],
      providers: [
        {
          provide: ResetPasswordService,
          useValue: mockResetPasswordService,
        },
      ],
      imports: [],
    }).compile();

    app = moduleFixture.createNestApplication();

    await app.init();
  });

  afterEach(async () => {
    if (app) await app.close();
  });

  describe('POST /password/reset', () => {
    it('should send emails when a request password is asked', async () => {
      const spyRequestUpdatePassword = jest.spyOn(
        mockResetPasswordService,
        'requestResetPassword',
      );

      await request(app.getHttpServer())
        .post('/password/reset')
        .send({
          login: 'login',
        })
        .expect(204);

      expect(spyRequestUpdatePassword).toHaveBeenCalledWith('login');
    });

    it('should swallow the error if a user is not found', async () => {
      const spyRequestUpdatePassword = jest.spyOn(
        mockResetPasswordService,
        'requestResetPassword',
      );
      spyRequestUpdatePassword.mockImplementation(() => {
        throw new UserNotFoundError();
      });

      await request(app.getHttpServer())
        .post('/password/reset')
        .send({
          login: 'login',
        })
        .expect(204);
    });

    it('should not swallow other error types', async () => {
      const spyRequestUpdatePassword = jest.spyOn(
        mockResetPasswordService,
        'requestResetPassword',
      );
      spyRequestUpdatePassword.mockImplementation(() => {
        throw new Error();
      });

      await request(app.getHttpServer())
        .post('/password/reset')
        .send({
          login: 'login',
        })
        .expect(500);
    });
  });

  describe('PUT /password/reset', () => {
    it('should reset the password', async () => {
      const spyReset = jest.spyOn(mockResetPasswordService, 'reset');

      await request(app.getHttpServer())
        .put('/password/reset')
        .send({
          id: 'id',
          code: 'code',
          password: 'password',
        })
        .expect(204);

      expect(spyReset).toHaveBeenCalledWith('id', 'code', 'password');
    });

    it('should swallow the error if a user is not found or a bad request code', async () => {
      const spyReset = jest.spyOn(mockResetPasswordService, 'reset');
      spyReset.mockImplementation(() => {
        throw new UserNotFoundError();
      });

      await request(app.getHttpServer())
        .put('/password/reset')
        .send({
          id: 'id',
          code: 'code',
          password: 'password',
        })
        .expect(401);

      spyReset.mockImplementation(() => {
        throw new BadResetCodeError();
      });
      await request(app.getHttpServer())
        .put('/password/reset')
        .send({
          id: 'id',
          code: 'code',
          password: 'password',
        })
        .expect(401);
    });
    it('should not swallow other error types', async () => {
      const spyReset = jest.spyOn(mockResetPasswordService, 'reset');
      spyReset.mockImplementation(() => {
        throw new Error();
      });

      await request(app.getHttpServer())
        .put('/password/reset')
        .send({
          id: 'id',
          code: 'code',
          password: 'password',
        })
        .expect(500);
    });
  });
});
