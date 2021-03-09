import { createTestContext } from '@tractr/nestjs-testing';
import request from 'supertest';

import { AppModule } from '../../../../src/app.module';
import { mockUserCreateBodyDtoFactory } from '../mocks';

const context = createTestContext(AppModule);

describe('Create a user (e2e)', () => {
  describe('Payload validation (e2e)', () => {
    it('should accept a valid payload', () => {
      const { app } = context;
      const body = mockUserCreateBodyDtoFactory();
      return request(app.getHttpServer()).post('/user').send(body).expect(201);
    });
  });
});
