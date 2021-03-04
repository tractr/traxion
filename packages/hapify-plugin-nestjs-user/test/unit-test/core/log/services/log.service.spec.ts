import { Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { LogService } from '@tractr/nestjs-core';

describe('LogService', () => {
  let logService: LogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LogService],
    }).compile();

    logService = module.get<LogService>(LogService);
  });

  it('should be defined', () => {
    expect(logService).toBeDefined();
  });

  it('should extend nest Logger', () => {
    expect(logService).toBeInstanceOf(Logger);
  });
});
