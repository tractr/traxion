import { createTestContext } from '@tractr/nestjs-testing';
import request from 'supertest';

import { AppModule } from '../../../../src/app.module';
import { mockRoleCreateBodyDtoFactory } from '../mocks';

const context = createTestContext(AppModule);

describe('Create a role (e2e)', () => {
  describe('Payload validation (e2e)', () => {
    it('should accept a valid payload', () => {
      const { app } = context;
      const body = mockRoleCreateBodyDtoFactory();
      return request(app.getHttpServer()).post('/role').send(body).expect(201);
    });
  });
});
