import { createTestContext } from '@tractr/nestjs-testing';
import request from 'supertest';

import { AppModule } from '../../src/app.module';

const context = createTestContext(AppModule);

describe('AppController (e2e)', () => {
  it('App should be defined', () => {
    const { app } = context;
    expect(app).toBeDefined();
  });

  it('App should reach the / endpoint', () => {
    const { app } = context;
    return request(app.getHttpServer()).get('/').expect(200).expect({});
  });
});
