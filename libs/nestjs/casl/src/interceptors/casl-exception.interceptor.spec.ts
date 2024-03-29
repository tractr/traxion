import { INestApplication } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

import { CaslExceptionInterceptor } from './casl-exception.interceptor';
import { CaslExceptionEndpointMockController } from '../../mocks/casl-exception-endpoint-mock.controller';

describe('Casl exception error', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [CaslExceptionEndpointMockController],
      providers: [
        {
          provide: APP_INTERCEPTOR,
          useClass: CaslExceptionInterceptor,
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();

    await app.init();
  });

  afterEach(async () => {
    if (app) await app.close();
  });

  describe('ForbiddenError', () => {
    it('ForbiddenError must return 403', async () => {
      const response = await request(app.getHttpServer()).get(
        '/casl-forbidden-error',
      );
      expect(response.status).toBe(403);
      expect(response.body.error).toBe('Forbidden');
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
