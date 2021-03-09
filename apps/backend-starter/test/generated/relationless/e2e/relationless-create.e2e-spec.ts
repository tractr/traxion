import { createTestContext } from '@tractr/nestjs-testing';
import request from 'supertest';

import { AppModule } from '../../../../src/app.module';
import { mockRelationlessCreateBodyDtoFactory } from '../mocks';

const context = createTestContext(AppModule);

describe('Create a relationless (e2e)', () => {
  describe('Payload validation (e2e)', () => {
    it('should accept a valid payload', () => {
      const { app } = context;
      const body = mockRelationlessCreateBodyDtoFactory();
      return request(app.getHttpServer())
        .post('/relationless')
        .send(body)
        .expect(201);
    });
  });
});
