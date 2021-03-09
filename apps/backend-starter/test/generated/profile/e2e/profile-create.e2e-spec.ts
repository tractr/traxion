import { createTestContext } from '@tractr/nestjs-testing';
import request from 'supertest';

import { AppModule } from '../../../../src/app.module';
import { mockProfileCreateBodyDtoFactory } from '../mocks';

const context = createTestContext(AppModule);

describe('Create a profile (e2e)', () => {
  describe('Payload validation (e2e)', () => {
    it('should accept a valid payload', () => {
      const { app } = context;
      const body = mockProfileCreateBodyDtoFactory();
      return request(app.getHttpServer())
        .post('/profile')
        .send(body)
        .expect(201);
    });
  });
});
