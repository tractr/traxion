import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';

import { AppModule } from './app.module';

describe('Cats', () => {
  let app: INestApplication;
  const catsService = { findAll: () => ['test'] };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/POST login`, () => request(app.getHttpServer())
      .post('/login')
      .send({ email: 'admin@traxion.com', password: 'password' })
      .expect(200)
      .expect({
        token: expect.any(String),
        user: {
          id: expect.any(String),
          email: 'admin@traxion.com',
          roles: ['admin'],
        },
      }));

  afterAll(async () => {
    await app.close();
  });
});
