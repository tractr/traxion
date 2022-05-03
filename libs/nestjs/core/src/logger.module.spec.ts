import { INestApplication, Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { LoggerModule } from './logger.module';
import { LoggerService } from './services';

describe('Authentication Module with async options', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [LoggerModule],
      providers: [
        { provide: 'Test', useFactory: (logger) => logger, inject: [Logger] },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    if (app) await app.close();
  });

  it('should get the LoggerService instance when using the Logger token', async () => {
    const logger = app.get('Test');
    expect(logger).toBeInstanceOf(LoggerService);
  });
});
