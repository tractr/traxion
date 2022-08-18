import {
  CanActivate,
  ExecutionContext,
  INestApplication,
  Injectable,
} from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { Test, TestingModule } from '@nestjs/testing';
import { mockDeep, MockProxy } from 'jest-mock-extended';
import * as request from 'supertest';

import { UserType } from '../interfaces';
import { PasswordService } from '../services';
import { PasswordController } from './password.controller';

describe('Password Controller', () => {
  let app: INestApplication;
  let mockPasswordService: MockProxy<PasswordService>;
  let mockReqUser: jest.Mock;
  let mockUser: UserType;

  beforeAll(async () => {
    mockReqUser = jest.fn();
    mockPasswordService = mockDeep<PasswordService>();

    mockUser = {
      id: '1',
      email: 'test@email.com',
      password: 'password',
    };

    class Guard implements CanActivate {
      canActivate(context: ExecutionContext) {
        const req = context.switchToHttp().getRequest();
        req.user = mockReqUser();
        return true;
      }
    }
    Injectable()(Guard);

    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [PasswordController],
      providers: [
        {
          provide: PasswordService,
          useValue: mockPasswordService,
        },
        { provide: APP_GUARD, useClass: Guard },
      ],
      imports: [],
    }).compile();

    app = moduleFixture.createNestApplication();

    await app.init();
  });

  afterEach(async () => {
    if (app) await app.close();
  });

  describe('Authentication route', () => {
    it('/password/update', async () => {
      mockReqUser.mockReturnValue(mockUser);
      const spyUpdatePassword = jest.spyOn(
        mockPasswordService,
        'updatePassword',
      );
      await request(app.getHttpServer())
        .patch('/password/update')
        .send({
          oldPassword: 'password',
          newPassword: 'newPassword',
        })
        .expect(200);

      expect(spyUpdatePassword).toHaveBeenCalledWith(
        '1',
        'password',
        'newPassword',
      );
    });
  });
});
