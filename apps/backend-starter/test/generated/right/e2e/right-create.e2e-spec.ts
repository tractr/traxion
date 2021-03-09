import { createTestContext } from '@tractr/nestjs-testing';
import request from 'supertest';

import { AppModule } from '../../../../src/app.module';
import { mockRightCreateBodyDtoFactory } from '../mocks';

const context = createTestContext(AppModule);

describe('Create a right (e2e)', () => {
  describe('Payload validation (e2e)', () => {
    it('should accept a valid payload', () => {
      const { app } = context;
      const body = mockRightCreateBodyDtoFactory();
      return request(app.getHttpServer()).post('/right').send(body).expect(201);
    });
  });
});
