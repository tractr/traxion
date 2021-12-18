import { INestApplication } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

import { PrismaExceptionEndpointMockController } from '../../mocks/prisma-exception-endpoint-mock.controller';
import { PrismaExceptionInterceptor } from './prisma-exception.interceptor';

describe('Prisma exception error', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [PrismaExceptionEndpointMockController],
      providers: [
        {
          provide: APP_INTERCEPTOR,
          useClass: PrismaExceptionInterceptor,
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();

    await app.init();
  });

  afterEach(async () => {
    if (app) await app.close();
  });

  describe('PrismaClientKnownRequestError', () => {
    it('PrismaClientKnownRequestError NotFoundException must return 404', async () => {
      const response = await request(app.getHttpServer()).get(
        '/known-request-error-not-found',
      );
      expect(response.status).toBe(404);
    });
    it('PrismaClientKnownRequestError ConflictException must return 409', async () => {
      const response = await request(app.getHttpServer()).get(
        '/known-request-error-conflict',
      );
      expect(response.status).toBe(409);
    });
  });
  describe('PrismaClientInitializationError must return 404', () => {
    it('PrismaClientInitializationError NotFoundException', async () => {
      const response = await request(app.getHttpServer()).get(
        '/initialization-error-not-found',
      );
      expect(response.status).toBe(404);
    });
    it('PrismaClientInitializationError ConflictException must return 409', async () => {
      const response = await request(app.getHttpServer()).get(
        '/initialization-error-conflict',
      );
      expect(response.status).toBe(409);
    });
  });

  describe('PrismaClientValidationError', () => {
    it('PrismaClientValidationError must return 409', async () => {
      const response = await request(app.getHttpServer()).get(
        '/client-validation-error',
      );
      expect(response.status).toBe(409);
    });
  });

  describe('PrismaClientRustPanicError', () => {
    it('PrismaClientRustPanicError must return 500', async () => {
      const response = await request(app.getHttpServer()).get(
        '/client-rust-panic-error',
      );
      expect(response.status).toBe(500);
    });
  });

  describe('PrismaClientUnknownRequestError', () => {
    it('PrismaClientUnknownRequestError must return 500', async () => {
      const response = await request(app.getHttpServer()).get(
        '/unknown-request-error',
      );
      expect(response.status).toBe(500);
    });
  });

  describe('DefaultError', () => {
    it('DefaultError must return 500', async () => {
      app.useLogger(false);
      const response = await request(app.getHttpServer()).get('/default-error');
      expect(response.status).toBe(500);
    });
  });
});
